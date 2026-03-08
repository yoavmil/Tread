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
import { MatDialog } from "@angular/material/dialog";
import mapboxgl from "mapbox-gl";

import { PlacesService } from "../../core/services/places.service";
import { AuthService } from "../../core/services/auth.service";
import { SubmissionsService } from "../../core/services/submissions.service";
import { Place, PlaceMarker, PlaceCategory, CATEGORY_LABELS, FilterState } from "../../models/place.model";
import { UnifiedReviewItem } from "../../models/edit-submission.model";
import { environment } from "../../../environments/environment";
import { FilterBarComponent } from "./filter-bar/filter-bar.component";
import { PlacePanelComponent } from "./place-panel/place-panel.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { AboutComponent } from "../about/about.component";
import { ReviewsComponent } from "./reviews/reviews.component";

const LAYER_UNVISITED = "places-unvisited";
const LAYER_VISITED = "places-visited";
const LAYER_SELECTED = "places-selected";
const LAYER_COORD_NEW = "places-coord-new";
const SOURCE_ID = "places";
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
    ReviewsComponent,
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
            (filterChange)="onFilterChange($event)"
          />
          @if (unifiedEditsCount() > 0) {
            <button class="menu-about-link" (click)="openReviews()">
              <mat-icon>rate_review</mat-icon>
              {{ unifiedEditsCount() }} ממתינים לבדיקה
            </button>
          }
          <button class="menu-about-link" (click)="openAbout()">
            <mat-icon>info_outline</mat-icon>
            אודות
          </button>
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

        @if (reviewsOpen()) {
          <app-reviews
            [items]="unifiedEdits()"
            (close)="onReviewsClose()"
            (newPlaceApproved)="onReviewNewApproved($event)"
            (eraseApproved)="onReviewEraseApproved($event)"
            (editApproved)="onReviewEditApproved($event)"
            (itemRemoved)="onReviewItemRemoved($event)"
            (coordChange)="onReviewCoordChange($event)"
            class="review-panel"
          />
        }

        @if (contextMenu()) {
          <div class="ctx-menu"
            [style.left.px]="contextMenu()!.x"
            [style.top.px]="contextMenu()!.y"
            (click)="$event.stopPropagation()">
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
  private suppressNextMapClick = false;

  loading = signal(true);
  allPlaces = signal<PlaceMarker[]>([]);
  panelLoading = signal(false);
  selectedPlace = signal<Place | null>(null);
  unifiedEdits = signal<UnifiedReviewItem[]>([]);
  unifiedEditsCount = computed(() => this.unifiedEdits().length);
  activeFilters = signal<FilterState>({
    categories: Object.keys(CATEGORY_LABELS) as PlaceCategory[],
    region: null,
    showVisited: true,
  });
  menuOpen = signal(false);
  reviewsOpen = signal(false);
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
    private dialog: MatDialog,
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

    if (this.auth.user()?.role === 'approver') {
      this.loadUnifiedEdits();
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
    });

    this.map.on("movestart", () => this.contextMenu.set(null));

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

    if ('ontouchstart' in window) {
      this.setupMobileLongPress();
    }
  }

  private setupMobileLongPress(): void {
    const canvas = this.map.getCanvas();
    let timer: ReturnType<typeof setTimeout> | null = null;
    let startPoint = { x: 0, y: 0 };

    canvas.addEventListener('touchstart', (e: TouchEvent) => {
      // Cancel any running timer first (handles second-finger arriving mid-press)
      if (timer) { clearTimeout(timer); timer = null; }
      // Only track single-finger presses
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      startPoint = { x: t.clientX - rect.left, y: t.clientY - rect.top };
      timer = setTimeout(() => {
        timer = null;
        const lngLat = this.map.unproject([startPoint.x, startPoint.y]);
        this.suppressNextMapClick = true;
        this.contextMenu.set({
          x: startPoint.x,
          y: startPoint.y,
          lat: parseFloat(lngLat.lat.toFixed(6)),
          lng: parseFloat(lngLat.lng.toFixed(6)),
        });
        // Reset flag after the synthetic click that may follow touchend
        setTimeout(() => { this.suppressNextMapClick = false; }, 400);
      }, 600);
    }, { passive: true });

    canvas.addEventListener('touchmove', (e: TouchEvent) => {
      if (!timer) return;
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const dx = Math.abs(t.clientX - rect.left - startPoint.x);
      const dy = Math.abs(t.clientY - rect.top - startPoint.y);
      if (dx > 10 || dy > 10) { clearTimeout(timer); timer = null; }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      if (timer) { clearTimeout(timer); timer = null; }
    }, { passive: true });

    canvas.addEventListener('touchcancel', () => {
      if (timer) { clearTimeout(timer); timer = null; }
    }, { passive: true });
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
      if (this.suppressNextMapClick) return;
      this.contextMenu.set(null);
      const features = this.map.queryRenderedFeatures(e.point, { layers: [LAYER_UNVISITED, LAYER_VISITED] });
      if (!features.length) {
        this.closePanel();
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

  private loadUnifiedEdits(): void {
    forkJoin([
      this.submissionsService.getPendingNew(),
      this.submissionsService.getPendingEdits(),
      this.submissionsService.getPendingErases(),
    ]).subscribe(([newItems, editItems, eraseItems]) => {
      const combined: UnifiedReviewItem[] = [
        ...newItems.map(n => ({ type: 'new' as const, _id: n._id, placeName: n.placeData.name, submittedBy: n.submittedBy, createdAt: n.createdAt })),
        ...editItems.filter(e => e.placeId).map(e => ({ type: 'edit' as const, _id: e._id, placeId: e.placeId, submittedBy: e.submittedBy, createdAt: e.createdAt })),
        ...eraseItems.filter(e => e.placeId).map(e => ({ type: 'erase' as const, _id: e._id, placeId: e.placeId, reason: e.reason, submittedBy: e.submittedBy, createdAt: e.createdAt })),
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.unifiedEdits.set(combined);
    });
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
      this.openPanel(place);
      this.location.replaceState(`/map/${place._id}`);
    }
  }

  openPanel(marker: PlaceMarker): void {
    this.panelLoading.set(true);
    this.selectedPlace.set(null);
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

  openAbout(): void {
    this.menuOpen.set(false);
    this.dialog.open(AboutComponent, { maxWidth: '600px', width: '90vw' });
  }

  openReviews(): void {
    this.menuOpen.set(false);
    this.reviewsOpen.set(true);
  }

  onReviewNewApproved(placeId: string): void {
    this.placesService.getById(placeId).subscribe((place) => {
      const marker: PlaceMarker = { _id: place._id, name: place.name, category: place.category, region: place.region, coordinates: place.coordinates };
      this.allPlaces.update((places) => [...places, marker]);
      if (this.mapReady) this.refreshSource();
    });
  }

  onReviewEraseApproved(placeId: string): void {
    this.allPlaces.update(places => places.filter(p => p._id !== placeId));
    if (this.mapReady) this.refreshSource();
  }

  onReviewEditApproved({ placeId, after }: { placeId: string; after: Partial<Place> }): void {
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
  }

  onReviewItemRemoved(id: string): void {
    this.unifiedEdits.update(items => items.filter(i => i._id !== id));
  }

  onReviewsClose(): void {
    this.reviewsOpen.set(false);
    this.clearCoordChange();
  }

  onReviewCoordChange(coords: { oldCoords: { lat: number; lng: number }; newCoords: { lat: number; lng: number } } | null): void {
    if (!coords) { this.clearCoordChange(); return; }
    this.showCoordChange(coords.newCoords);
    this.map.fitBounds(
      [
        [Math.min(coords.oldCoords.lng, coords.newCoords.lng), Math.min(coords.oldCoords.lat, coords.newCoords.lat)],
        [Math.max(coords.oldCoords.lng, coords.newCoords.lng), Math.max(coords.oldCoords.lat, coords.newCoords.lat)],
      ],
      { padding: 120, maxZoom: 14, duration: 700 },
    );
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
