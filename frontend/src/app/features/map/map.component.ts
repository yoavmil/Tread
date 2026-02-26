import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  signal,
  computed,
  effect,
} from "@angular/core";
import { forkJoin } from "rxjs";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule, Location } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import mapboxgl from "mapbox-gl";

import { PlacesService } from "../../core/services/places.service";
import { AuthService } from "../../core/services/auth.service";
import { SubmissionsService } from "../../core/services/submissions.service";
import { Place, PlaceMarker, PlaceCategory, CATEGORY_LABELS, FilterState } from "../../models/place.model";
import { NewSubmission } from "../../models/new-submission.model";
import { ReviewItemSummary, ReviewDetail } from "../../models/edit-submission.model";
import { environment } from "../../../environments/environment";
import { FilterBarComponent } from "./filter-bar/filter-bar.component";
import { PlacePanelComponent } from "./place-panel/place-panel.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { EditReviewPanelComponent } from "./edit-review-panel/edit-review-panel.component";

const LAYER_UNVISITED = "places-unvisited";
const LAYER_VISITED = "places-visited";
const LAYER_SELECTED = "places-selected";
const LAYER_SUBMISSIONS = "places-submissions";
const LAYER_EDITS = "places-edits";
const LAYER_COORD_NEW = "places-coord-new";
const SOURCE_ID = "places";
const SOURCE_SUBMISSIONS = "submissions";
const SOURCE_EDITS = "edits";
const SOURCE_COORD_NEW = "coord-new";

@Component({
  selector: "app-map",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    FilterBarComponent,
    PlacePanelComponent,
    SearchBarComponent,
    EditReviewPanelComponent,
  ],
  template: `
    <div class="map-page">
      <header class="map-header">
        <div class="header-left">
          <button class="menu-btn" (click)="menuOpen.set(!menuOpen())" title="Menu">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="app-logo">תִּדְרֹךְ</span>
        </div>
        <div class="header-center">
          <app-search-bar (placeSelected)="onSearchSelect($event)" />
        </div>
        <div class="header-right">
          <span class="visit-count">
            {{ visitedCount() }}/{{ allPlaces().length }}
          </span>
          <a routerLink="/profile" class="avatar-btn">
            @if (user()?.photo) {
              <img
                [src]="user()!.photo"
                [alt]="user()!.displayName"
                class="avatar"
                referrerpolicy="no-referrer"
              />
            } @else {
              <span class="avatar-placeholder">{{ userInitial() }}</span>
            }
          </a>
        </div>
      </header>

      @if (menuOpen()) {
        <div class="menu-backdrop" (click)="menuOpen.set(false)"></div>
        <div class="menu-panel">
          <span class="menu-section-title">
            מסננים
            @if (activeFilters().categories.length > 0) {
              <span class="active-count">({{ activeFilters().categories.length }} active)</span>
            }
          </span>
          <app-filter-bar
            [pendingEditsCount]="pendingEditsCount()"
            (filterChange)="onFilterChange($event)"
            (pendingEditsEnabled)="menuOpen.set(false)"
          />
        </div>
      }

      <div class="map-container">
        <div #mapEl class="mapbox-map"></div>

        @if (loading()) {
          <div class="map-loading">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
        }

        <div class="map-controls">
          <button class="map-ctrl-btn" title="Fit Israel" (click)="fitIsrael()">
            <mat-icon>crop_free</mat-icon>
          </button>
          <button class="map-ctrl-btn" title="My location" (click)="goToMyLocation()">
            <mat-icon>my_location</mat-icon>
          </button>
          <button class="map-ctrl-btn map-ctrl-add" title="הוסף מיקום חדש" (click)="openNewPlace()">
            <mat-icon>add</mat-icon>
          </button>
        </div>

        @if (panelLoading()) {
          <div class="place-panel place-panel--loading">
            <mat-spinner diameter="32"></mat-spinner>
          </div>
        } @else if (selectedPlace()) {
          <app-place-panel
            [place]="selectedPlace()!"
            [isVisited]="isVisited(selectedPlace()!._id)"
            (close)="closePanel()"
            (toggleVisit)="onToggleVisit($event)"
            class="place-panel"
          />
        }

        @if (selectedSubmission()) {
          <app-place-panel
            [place]="submissionAsPlace(selectedSubmission()!)"
            [isVisited]="false"
            [submissionId]="selectedSubmission()!._id"
            [isApprover]="auth.user()?.role === 'approver'"
            [submittedByName]="selectedSubmission()!.submittedBy?.displayName"
            (close)="closeSubmissionPanel()"
            (approve)="onApproveSubmission()"
            (decline)="onDeclineSubmission()"
            class="place-panel"
          />
        }

        @if (editDetailLoading()) {
          <div class="edit-review-panel edit-review-panel--loading">
            <mat-spinner diameter="32"></mat-spinner>
          </div>
        } @else if (selectedEditDetail()) {
          <app-edit-review-panel
            [detail]="selectedEditDetail()!"
            [currentIndex]="selectedEditIdx()"
            [totalCount]="pendingEdits().length"
            (close)="closeEditPanel()"
            (approve)="onApproveEdit()"
            (decline)="onDeclineEdit()"
            (next)="onNextEdit()"
            (prev)="onPrevEdit()"
            class="edit-review-panel"
          />
        }

        @if (contextMenu()) {
          <div class="ctx-backdrop" (click)="contextMenu.set(null)"></div>
          <div class="ctx-menu"
            [style.left.px]="contextMenu()!.x"
            [style.top.px]="contextMenu()!.y">
            <button class="ctx-item" (click)="onContextNewPlace()">
              <mat-icon>add_location</mat-icon>
              הצע מקום חדש כאן
            </button>
            <button class="ctx-item" (click)="onContextCopyCoords()">
              <mat-icon>content_copy</mat-icon>
              העתק קואורדינטות
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: "./map.component.scss",
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("mapEl") mapEl!: ElementRef<HTMLDivElement>;

  private map!: mapboxgl.Map;
  private mapReady = false;

  loading = signal(true);
  allPlaces = signal<PlaceMarker[]>([]);
  panelLoading = signal(false);
  selectedPlace = signal<Place | null>(null);
  pendingSubmissions = signal<NewSubmission[]>([]);
  selectedSubmission = signal<NewSubmission | null>(null);
  pendingEdits = signal<ReviewItemSummary[]>([]);
  pendingEditsCount = signal(0);
  selectedEditIdx = signal(-1);
  selectedEditDetail = signal<ReviewDetail | null>(null);
  editDetailLoading = signal(false);
  activeFilters = signal<FilterState>({
    categories: Object.keys(CATEGORY_LABELS) as PlaceCategory[],
    region: null,
    showVisited: true,
    showPendingSubmissions: false,
    showPendingEdits: false,
  });
  menuOpen = signal(false);
  contextMenu = signal<{ x: number; y: number; lat: number; lng: number } | null>(null);

  visitedCount = computed(
    () =>
      this.allPlaces().filter((p) => this.auth.visitedPlaceIds().has(p._id))
        .length,
  );
  user = this.auth.user;
  userInitial = computed(
    () => this.auth.user()?.displayName?.charAt(0).toUpperCase() ?? "?",
  );
  isVisited = (id: string) => this.auth.visitedPlaceIds().has(id);

  constructor(
    private placesService: PlacesService,
    private submissionsService: SubmissionsService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {
    // Refresh source data whenever visited set changes
    effect(() => {
      this.auth.visitedPlaceIds();
      if (this.mapReady) this.refreshSource();
    });

    // Update layer filters whenever active filters change
    effect(() => {
      const filters = this.activeFilters();
      if (this.mapReady) this.applyLayerFilters(filters);
    });

    // Show/hide submissions layer based on filter
    effect(() => {
      const show = this.activeFilters().showPendingSubmissions;
      if (!this.mapReady) return;
      if (show) {
        this.fetchAndShowSubmissions();
      } else {
        this.hideSubmissionsLayer();
      }
    });

    // Show/hide edits layer based on filter
    effect(() => {
      const show = this.activeFilters().showPendingEdits;
      if (!this.mapReady) return;
      if (show) {
        this.fetchAndShowEdits();
      } else {
        this.hideEditsLayer();
      }
    });

    // Clear the proposed-position marker whenever no edit is being reviewed
    effect(() => {
      if (!this.selectedEditDetail()) this.clearCoordChange();
    });
  }

  ngOnInit(): void {
    this.placesService.getAll().subscribe({
      next: (places) => {
        this.allPlaces.set(places);
        this.loading.set(false);
        if (this.mapReady) this.initLayers(places);

        const placeId = this.route.snapshot.paramMap.get("placeId");
        if (placeId) {
          const place = places.find((p) => p._id === placeId);
          if (place) this.openPanel(place);
        }
      },
      error: () => this.loading.set(false),
    });

    // Pre-fetch pending review count for the badge (edits + erases)
    if (this.auth.user()?.role === 'approver') {
      forkJoin([
        this.submissionsService.getPendingEdits(),
        this.submissionsService.getPendingErases(),
      ]).subscribe(([edits, erases]) =>
        this.pendingEditsCount.set(edits.length + erases.length));
    }
  }

  ngAfterViewInit(): void {
    (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken =
      environment.mapboxToken;

    this.map = new mapboxgl.Map({
      container: this.mapEl.nativeElement,
      style: "mapbox://styles/mapbox/outdoors-v12",
      language: "he",
      center: [35.0, 31.5],
      zoom: 7,
      minZoom: 5,
      maxZoom: 16,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    this.map.fitBounds(
      [
        [34.2, 29.4],
        [35.9, 33.4],
      ],
      { padding: 40, duration: 0 },
    );

    this.map.on("load", () => {
      this.mapReady = true;
      if (this.allPlaces().length > 0) {
        this.initLayers(this.allPlaces());
      }
      if (this.activeFilters().showPendingSubmissions) {
        this.fetchAndShowSubmissions();
      }
      if (this.activeFilters().showPendingEdits) {
        this.fetchAndShowEdits();
      }
    });

    this.map.on("contextmenu", (e) => {
      e.preventDefault();
      const { lat, lng } = e.lngLat;
      const { x, y } = e.point;
      this.contextMenu.set({
        x, y,
        lat: parseFloat(lat.toFixed(6)),
        lng: parseFloat(lng.toFixed(6)),
      });
    });
  }

  // ── GeoJSON helpers ────────────────────────────────────────────────────────

  private buildGeoJSON(places: PlaceMarker[]): GeoJSON.FeatureCollection {
    const visitedIds = this.auth.visitedPlaceIds();
    return {
      type: "FeatureCollection",
      features: places.map((p) => ({
        type: "Feature",
        id: p._id,
        geometry: {
          type: "Point",
          coordinates: [p.coordinates.lng, p.coordinates.lat],
        },
        properties: {
          id: p._id,
          category: p.category,
          region: p.region,
          visited: visitedIds.has(p._id),
        },
      })),
    };
  }

  private buildSubmissionsGeoJSON(submissions: NewSubmission[]): GeoJSON.FeatureCollection {
    return {
      type: "FeatureCollection",
      features: submissions
        .filter((s) => s.placeData.coordinates)
        .map((s) => ({
          type: "Feature",
          id: s._id,
          geometry: {
            type: "Point",
            coordinates: [s.placeData.coordinates!.lng, s.placeData.coordinates!.lat],
          },
          properties: { id: s._id, name: s.placeData.name },
        })),
    };
  }

  private buildEditsGeoJSON(edits: ReviewItemSummary[]): GeoJSON.FeatureCollection {
    const features: GeoJSON.Feature[] = [];
    edits.forEach((ed, idx) => {
      const place = this.allPlaces().find(p => p._id === ed.placeId._id);
      if (!place) return;
      features.push({
        type: "Feature",
        id: ed._id,
        geometry: {
          type: "Point",
          coordinates: [place.coordinates.lng, place.coordinates.lat],
        },
        properties: { id: ed._id, idx },
      });
    });
    return { type: "FeatureCollection", features };
  }

  submissionAsPlace(sub: NewSubmission): Place {
    return {
      _id: sub._id,
      name: sub.placeData.name,
      category: sub.placeData.category ?? "nature",
      region: sub.placeData.region ?? "north",
      coordinates: sub.placeData.coordinates ?? { lat: 31.5, lng: 35.0 },
      aliases: sub.placeData.aliases ?? [],
      description: sub.placeData.description ?? "",
      difficulty: sub.placeData.difficulty ?? null,
      images: sub.placeData.images ?? [],
      externalUrl: sub.placeData.externalUrl ?? "",
      visitorsCount: 0,
    };
  }

  // ── Layer setup ────────────────────────────────────────────────────────────

  private async loadTrailLine(): Promise<void> {
    const query = `[out:json][timeout:120];relation(282071);way(r);out geom;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    try {
      const res = await fetch(url);
      if (!res.ok || !this.mapReady) return;
      const data = await res.json();
      if (!this.mapReady) return;

      const features: GeoJSON.Feature[] = (data.elements as any[])
        .filter(el => el.type === 'way' && el.geometry?.length)
        .map(way => ({
          type: 'Feature' as const,
          geometry: {
            type: 'LineString' as const,
            coordinates: way.geometry.map((pt: { lon: number; lat: number }) => [pt.lon, pt.lat]),
          },
          properties: {},
        }));

      this.map.addSource('int-trail', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features },
      });
      this.map.addLayer(
        {
          id: 'int-trail-line',
          type: 'line',
          source: 'int-trail',
          paint: {
            'line-color': '#E07B39',
            'line-width': ['interpolate', ['linear'], ['zoom'], 5, 1.5, 12, 3],
            'line-opacity': 0.9,
          },
        },
        LAYER_UNVISITED,
      );
    } catch {
      // trail line is decorative — ignore errors
    }
  }

  private initLayers(places: PlaceMarker[]): void {
    this.loadTrailLine();

    this.map.addSource(SOURCE_ID, {
      type: "geojson",
      data: this.buildGeoJSON(places),
    });

    // Unvisited places — orange
    this.map.addLayer({
      id: LAYER_UNVISITED,
      type: "circle",
      source: SOURCE_ID,
      filter: ["==", ["get", "visited"], false],
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 5, 12, 9],
        "circle-color": "#FF8C00",
        "circle-stroke-width": 1.5,
        "circle-stroke-color": "#fff",
        "circle-opacity": 0.9,
      },
    });

    // Visited places — gray
    this.map.addLayer({
      id: LAYER_VISITED,
      type: "circle",
      source: SOURCE_ID,
      filter: ["==", ["get", "visited"], true],
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 5, 12, 9],
        "circle-color": "#9E9E9E",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#fff",
        "circle-opacity": 1,
      },
    });

    // Selected place highlight ring
    this.map.addLayer({
      id: LAYER_SELECTED,
      type: "circle",
      source: SOURCE_ID,
      filter: ["==", ["get", "id"], ""],
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 9, 12, 14],
        "circle-color": "transparent",
        "circle-stroke-width": 3,
        "circle-stroke-color": "#1a3a2a",
        "circle-opacity": 1,
      },
    });

    // Click handlers
    this.map.on("click", LAYER_UNVISITED, (e) => this.onMarkerClick(e));
    this.map.on("click", LAYER_VISITED, (e) => this.onMarkerClick(e));

    // Cursor pointer on hover
    for (const layer of [LAYER_UNVISITED, LAYER_VISITED]) {
      this.map.on(
        "mouseenter",
        layer,
        () => (this.map.getCanvas().style.cursor = "pointer"),
      );
      this.map.on(
        "mouseleave",
        layer,
        () => (this.map.getCanvas().style.cursor = ""),
      );
    }

    // Click on empty map = close panels + context menu
    this.map.on("click", (e) => {
      this.contextMenu.set(null);
      const layers: string[] = [LAYER_UNVISITED, LAYER_VISITED];
      if (this.map.getLayer(LAYER_SUBMISSIONS)) layers.push(LAYER_SUBMISSIONS);
      if (this.map.getLayer(LAYER_EDITS)) layers.push(LAYER_EDITS);
      const features = this.map.queryRenderedFeatures(e.point, { layers });
      if (!features.length) {
        this.closePanel();
        this.closeSubmissionPanel();
        this.closeEditPanel();
      }
    });

    // Apply any filters that were set before map loaded
    this.applyLayerFilters(this.activeFilters());
  }

  private refreshSource(): void {
    const source = this.map.getSource(SOURCE_ID) as
      | mapboxgl.GeoJSONSource
      | undefined;
    source?.setData(this.buildGeoJSON(this.allPlaces()));
  }

  private applyLayerFilters(filters: FilterState): void {
    if (!this.map.getLayer(LAYER_UNVISITED)) return;

    const baseFilter = this.buildMapboxFilter(filters);

    this.map.setFilter(LAYER_UNVISITED, [
      "all",
      ...baseFilter,
      ["==", ["get", "visited"], false],
    ]);

    if (filters.showVisited) {
      this.map.setLayoutProperty(LAYER_VISITED, "visibility", "visible");
      this.map.setFilter(LAYER_VISITED, [
        "all",
        ...baseFilter,
        ["==", ["get", "visited"], true],
      ]);
    } else {
      this.map.setLayoutProperty(LAYER_VISITED, "visibility", "none");
    }
  }

  private initSubmissionsLayer(): void {
    if (this.map.getSource(SOURCE_SUBMISSIONS)) return;

    this.map.addSource(SOURCE_SUBMISSIONS, {
      type: "geojson",
      data: this.buildSubmissionsGeoJSON(this.pendingSubmissions()),
    });

    this.map.addLayer({
      id: LAYER_SUBMISSIONS,
      type: "circle",
      source: SOURCE_SUBMISSIONS,
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 5, 12, 9],
        "circle-color": "#7C3AED",
        "circle-stroke-width": 1.5,
        "circle-stroke-color": "#fff",
        "circle-opacity": 0.9,
      },
    });

    this.map.on("click", LAYER_SUBMISSIONS, (e) => this.onSubmissionClick(e));
    this.map.on("mouseenter", LAYER_SUBMISSIONS, () => (this.map.getCanvas().style.cursor = "pointer"));
    this.map.on("mouseleave", LAYER_SUBMISSIONS, () => (this.map.getCanvas().style.cursor = ""));
  }

  private refreshSubmissionsSource(): void {
    const source = this.map.getSource(SOURCE_SUBMISSIONS) as mapboxgl.GeoJSONSource | undefined;
    source?.setData(this.buildSubmissionsGeoJSON(this.pendingSubmissions()));
  }

  private fetchAndShowSubmissions(): void {
    this.submissionsService.getPending().subscribe((subs) => {
      this.pendingSubmissions.set(subs);
      this.initSubmissionsLayer();
      if (this.map.getLayer(LAYER_SUBMISSIONS)) {
        this.map.setLayoutProperty(LAYER_SUBMISSIONS, "visibility", "visible");
      }
      this.refreshSubmissionsSource();
    });
  }

  private hideSubmissionsLayer(): void {
    if (this.map.getLayer(LAYER_SUBMISSIONS)) {
      this.map.setLayoutProperty(LAYER_SUBMISSIONS, "visibility", "none");
    }
    this.pendingSubmissions.set([]);
    this.selectedSubmission.set(null);
  }

  private initEditsLayer(): void {
    if (this.map.getSource(SOURCE_EDITS)) return;

    this.map.addSource(SOURCE_EDITS, {
      type: "geojson",
      data: this.buildEditsGeoJSON(this.pendingEdits()),
    });

    this.map.addLayer({
      id: LAYER_EDITS,
      type: "circle",
      source: SOURCE_EDITS,
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 6, 12, 10],
        "circle-color": "#F59E0B",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#fff",
        "circle-opacity": 0.95,
      },
    });

    this.map.on("click", LAYER_EDITS, (e) => this.onEditMarkerClick(e));
    this.map.on("mouseenter", LAYER_EDITS, () => (this.map.getCanvas().style.cursor = "pointer"));
    this.map.on("mouseleave", LAYER_EDITS, () => (this.map.getCanvas().style.cursor = ""));
  }

  private refreshEditsSource(): void {
    const source = this.map.getSource(SOURCE_EDITS) as mapboxgl.GeoJSONSource | undefined;
    source?.setData(this.buildEditsGeoJSON(this.pendingEdits()));
  }

  private fetchAndShowEdits(): void {
    forkJoin([
      this.submissionsService.getPendingEdits(),
      this.submissionsService.getPendingErases(),
    ]).subscribe(([edits, erases]) => {
      const combined: ReviewItemSummary[] = [
        ...edits.map(e => ({ ...e, type: 'edit' as const })),
        ...erases.map(e => ({ ...e, type: 'erase' as const })),
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.pendingEdits.set(combined);
      this.pendingEditsCount.set(combined.length);
      this.initEditsLayer();
      if (this.map.getLayer(LAYER_EDITS)) {
        this.map.setLayoutProperty(LAYER_EDITS, "visibility", "visible");
      }
      this.refreshEditsSource();
      if (combined.length > 0) {
        this.openEditByIndex(0);
      }
    });
  }

  private hideEditsLayer(): void {
    if (this.map.getLayer(LAYER_EDITS)) {
      this.map.setLayoutProperty(LAYER_EDITS, "visibility", "none");
    }
    this.pendingEdits.set([]);
    this.selectedEditDetail.set(null);
    this.selectedEditIdx.set(-1);
  }

  private initCoordNewLayer(): void {
    if (this.map.getSource(SOURCE_COORD_NEW)) return;
    this.map.addSource(SOURCE_COORD_NEW, {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] },
    });
    this.map.addLayer({
      id: LAYER_COORD_NEW,
      type: "circle",
      source: SOURCE_COORD_NEW,
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 7, 12, 12],
        "circle-color": "#22C55E",
        "circle-stroke-width": 2.5,
        "circle-stroke-color": "#fff",
        "circle-opacity": 0.95,
      },
    });
  }

  private showCoordChange(newCoords: { lat: number; lng: number }): void {
    if (!this.mapReady) return;
    this.initCoordNewLayer();
    const source = this.map.getSource(SOURCE_COORD_NEW) as mapboxgl.GeoJSONSource;
    source.setData({
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: { type: "Point", coordinates: [newCoords.lng, newCoords.lat] },
        properties: {},
      }],
    });
    this.map.setLayoutProperty(LAYER_COORD_NEW, "visibility", "visible");
  }

  private clearCoordChange(): void {
    if (!this.mapReady || !this.map?.getLayer(LAYER_COORD_NEW)) return;
    this.map.setLayoutProperty(LAYER_COORD_NEW, "visibility", "none");
  }

  private buildMapboxFilter(filters: FilterState): mapboxgl.Expression[] {
    const conditions: mapboxgl.Expression[] = [];
    conditions.push([
      "in",
      ["get", "category"],
      ["literal", filters.categories],
    ]);
    if (filters.region) {
      conditions.push(["==", ["get", "region"], filters.region]);
    }
    return conditions;
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  private onMarkerClick(e: mapboxgl.MapLayerMouseEvent): void {
    e.originalEvent.stopPropagation();
    const props = e.features?.[0]?.properties;
    if (!props) return;
    const place = this.allPlaces().find((p) => p._id === props["id"]);
    if (place) {
      this.selectedSubmission.set(null);
      this.selectedEditDetail.set(null);
      this.selectedEditIdx.set(-1);
      this.openPanel(place);
      this.location.replaceState(`/map/${place._id}`);
    }
  }

  private onSubmissionClick(e: mapboxgl.MapLayerMouseEvent): void {
    e.originalEvent.stopPropagation();
    const props = e.features?.[0]?.properties;
    if (!props) return;
    const sub = this.pendingSubmissions().find((s) => s._id === props["id"]);
    if (sub) {
      this.selectedSubmission.set(sub);
      this.selectedPlace.set(null);
      this.selectedEditDetail.set(null);
      this.selectedEditIdx.set(-1);
      if (this.mapReady && this.map.getLayer(LAYER_SELECTED)) {
        this.map.setFilter(LAYER_SELECTED, ["==", ["get", "id"], ""]);
      }
      if (sub.placeData.coordinates) {
        this.map.flyTo({
          center: [sub.placeData.coordinates.lng, sub.placeData.coordinates.lat],
          zoom: Math.max(this.map.getZoom(), 10),
          duration: 600,
        });
      }
    }
  }

  private onEditMarkerClick(e: mapboxgl.MapLayerMouseEvent): void {
    e.originalEvent.stopPropagation();
    const props = e.features?.[0]?.properties;
    if (!props) return;
    const idx = this.pendingEdits().findIndex(ed => ed._id === props["id"]);
    if (idx >= 0) this.openEditByIndex(idx);
  }

  openEditByIndex(idx: number): void {
    const edits = this.pendingEdits();
    if (idx < 0 || idx >= edits.length) return;
    const summary = edits[idx];
    this.selectedEditIdx.set(idx);
    this.selectedEditDetail.set(null);
    this.editDetailLoading.set(true);
    this.selectedPlace.set(null);
    this.selectedSubmission.set(null);
    if (this.mapReady && this.map.getLayer(LAYER_SELECTED)) {
      this.map.setFilter(LAYER_SELECTED, ["==", ["get", "id"], ""]);
    }
    const place = this.allPlaces().find(p => p._id === summary.placeId._id);
    if (place) {
      this.map?.flyTo({
        center: [place.coordinates.lng, place.coordinates.lat],
        zoom: Math.max(this.map?.getZoom() ?? 7, 10),
        duration: 600,
      });
    }
    if (summary.type === 'erase') {
      this.submissionsService.getEraseById(summary._id).subscribe({
        next: (detail) => { this.selectedEditDetail.set({ ...detail, type: 'erase' }); this.editDetailLoading.set(false); },
        error: () => this.editDetailLoading.set(false),
      });
    } else {
      this.submissionsService.getEditById(summary._id).subscribe({
        next: (detail) => {
          this.selectedEditDetail.set({ ...detail, type: 'edit' });
          this.editDetailLoading.set(false);
          const oldCoords = detail.before.coordinates;
          const newCoords = detail.after.coordinates;
          if (oldCoords && newCoords &&
              (oldCoords.lat !== newCoords.lat || oldCoords.lng !== newCoords.lng)) {
            this.showCoordChange(newCoords);
            this.map.fitBounds(
              [
                [Math.min(oldCoords.lng, newCoords.lng), Math.min(oldCoords.lat, newCoords.lat)],
                [Math.max(oldCoords.lng, newCoords.lng), Math.max(oldCoords.lat, newCoords.lat)],
              ],
              { padding: 120, maxZoom: 14, duration: 700 },
            );
          }
        },
        error: () => this.editDetailLoading.set(false),
      });
    }
  }

  openPanel(marker: PlaceMarker): void {
    this.panelLoading.set(true);
    this.selectedPlace.set(null);
    this.selectedSubmission.set(null);
    if (this.mapReady && this.map.getLayer(LAYER_SELECTED)) {
      this.map.setFilter(LAYER_SELECTED, ["==", ["get", "id"], marker._id]);
    }
    this.map?.flyTo({
      center: [marker.coordinates.lng, marker.coordinates.lat],
      zoom: Math.max(this.map?.getZoom() ?? 7, 10),
      duration: 600,
    });
    this.placesService.getById(marker._id).subscribe({
      next: (place) => { this.selectedPlace.set(place); this.panelLoading.set(false); },
      error: () => this.panelLoading.set(false),
    });
  }

  closePanel(): void {
    this.selectedPlace.set(null);
    if (this.mapReady && this.map.getLayer(LAYER_SELECTED)) {
      this.map.setFilter(LAYER_SELECTED, ["==", ["get", "id"], ""]);
    }
    this.location.replaceState("/map");
  }

  closeSubmissionPanel(): void {
    this.selectedSubmission.set(null);
  }

  closeEditPanel(): void {
    this.selectedEditDetail.set(null);
    this.selectedEditIdx.set(-1);
  }

  onApproveSubmission(): void {
    const sub = this.selectedSubmission();
    if (!sub) return;
    this.submissionsService.approve(sub._id).subscribe({
      next: (result) => {
        this.placesService.getById(result.placeId).subscribe((place) => {
          const marker: PlaceMarker = { _id: place._id, name: place.name, category: place.category, region: place.region, coordinates: place.coordinates };
          this.allPlaces.update((places) => [...places, marker]);
          if (this.mapReady) this.refreshSource();
        });
        this.pendingSubmissions.update((subs) => subs.filter((s) => s._id !== sub._id));
        if (this.mapReady) this.refreshSubmissionsSource();
        this.closeSubmissionPanel();
      },
      error: () => {},
    });
  }

  onDeclineSubmission(): void {
    const sub = this.selectedSubmission();
    if (!sub) return;
    this.submissionsService.decline(sub._id).subscribe({
      next: () => {
        this.pendingSubmissions.update((subs) => subs.filter((s) => s._id !== sub._id));
        if (this.mapReady) this.refreshSubmissionsSource();
        this.closeSubmissionPanel();
      },
      error: () => {},
    });
  }

  onApproveEdit(): void {
    const detail = this.selectedEditDetail();
    if (!detail) return;

    if (detail.type === 'erase') {
      const placeId = detail.placeId._id;
      this.submissionsService.approveErase(detail._id).subscribe({
        next: () => {
          // Remove ALL pending review items for this place (edits + other erases)
          this.pendingEdits.update(items => items.filter(i => i.placeId._id !== placeId));
          // Remove the place from the map
          this.allPlaces.update(places => places.filter(p => p._id !== placeId));
          if (this.mapReady) { this.refreshSource(); this.refreshEditsSource(); }
          this.pendingEditsCount.set(this.pendingEdits().length);
          const newLength = this.pendingEdits().length;
          if (newLength === 0) {
            this.closeEditPanel();
          } else {
            this.openEditByIndex(0);
          }
        },
        error: () => {},
      });
    } else {
      this.submissionsService.approveEdit(detail._id).subscribe({
        next: () => {
          // Patch the map marker with any PlaceMarker-relevant fields that changed
          const after = detail.after;
          const placeId = detail.placeId._id;
          if (after.coordinates || after.name || after.category || after.region) {
            this.allPlaces.update(places => places.map(p =>
              p._id === placeId ? {
                ...p,
                ...(after.coordinates && { coordinates: after.coordinates }),
                ...(after.name       && { name: after.name }),
                ...(after.category   && { category: after.category }),
                ...(after.region     && { region: after.region }),
              } : p
            ));
            if (this.mapReady) this.refreshSource();
          }
          const idx = this.selectedEditIdx();
          this.pendingEdits.update(edits => edits.filter(e => e._id !== detail._id));
          this.pendingEditsCount.set(this.pendingEdits().length);
          if (this.mapReady) this.refreshEditsSource();
          const newLength = this.pendingEdits().length;
          if (newLength === 0) {
            this.closeEditPanel();
          } else {
            this.openEditByIndex(Math.min(idx, newLength - 1));
          }
        },
        error: () => {},
      });
    }
  }

  onDeclineEdit(): void {
    const detail = this.selectedEditDetail();
    if (!detail) return;
    const idx = this.selectedEditIdx();

    const decline$ = detail.type === 'erase'
      ? this.submissionsService.declineErase(detail._id)
      : this.submissionsService.declineEdit(detail._id);

    decline$.subscribe({
      next: () => {
        this.pendingEdits.update(items => items.filter(i => i._id !== detail._id));
        this.pendingEditsCount.set(this.pendingEdits().length);
        if (this.mapReady) this.refreshEditsSource();
        const newLength = this.pendingEdits().length;
        if (newLength === 0) {
          this.closeEditPanel();
        } else {
          this.openEditByIndex(Math.min(idx, newLength - 1));
        }
      },
      error: () => {},
    });
  }

  onNextEdit(): void {
    const idx = this.selectedEditIdx();
    if (idx < this.pendingEdits().length - 1) this.openEditByIndex(idx + 1);
  }

  onPrevEdit(): void {
    const idx = this.selectedEditIdx();
    if (idx > 0) this.openEditByIndex(idx - 1);
  }

  fitIsrael(): void {
    this.map?.fitBounds(
      [
        [34.2, 29.4],
        [35.9, 33.4],
      ],
      { padding: 40, duration: 800 },
    );
  }

  goToMyLocation(): void {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      this.map?.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 13,
        duration: 800,
      });
    });
  }

  onToggleVisit(updatedPlace: Place): void {
    this.selectedPlace.set(updatedPlace);
  }

  onSearchSelect(marker: PlaceMarker): void {
    this.openPanel(marker);
    this.location.replaceState(`/map/${marker._id}`);
  }

  onFilterChange(filters: FilterState): void {
    this.activeFilters.set(filters);
  }

  onContextNewPlace(): void {
    const menu = this.contextMenu();
    this.contextMenu.set(null);
    if (menu) this.openNewPlace(menu.lat, menu.lng);
  }

  onContextCopyCoords(): void {
    const menu = this.contextMenu();
    this.contextMenu.set(null);
    if (menu) navigator.clipboard.writeText(`${menu.lat}, ${menu.lng}`);
  }

  openNewPlace(lat?: number, lng?: number): void {
    const queryParams = (lat != null && lng != null) ? { lat, lng } : {};
    this.router.navigate(['/new-place'], { queryParams });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
