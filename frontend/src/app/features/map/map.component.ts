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
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CommonModule, Location } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import mapboxgl from "mapbox-gl";

import { PlacesService } from "../../core/services/places.service";
import { AuthService } from "../../core/services/auth.service";
import { Place, PlaceCategory, CATEGORY_LABELS, FilterState } from "../../models/place.model";
import { environment } from "../../../environments/environment";
import { FilterBarComponent } from "./filter-bar/filter-bar.component";
import { PlacePanelComponent } from "./place-panel/place-panel.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";

const LAYER_UNVISITED = "places-unvisited";
const LAYER_VISITED = "places-visited";
const LAYER_SELECTED = "places-selected";
const SOURCE_ID = "places";

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
          <app-filter-bar (filterChange)="onFilterChange($event)" />
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
        </div>

        @if (selectedPlace()) {
          <app-place-panel
            [place]="selectedPlace()!"
            [isVisited]="isVisited(selectedPlace()!._id)"
            (close)="closePanel()"
            (toggleVisit)="onToggleVisit()"
            class="place-panel"
          />
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
  allPlaces = signal<Place[]>([]);
  selectedPlace = signal<Place | null>(null);
  activeFilters = signal<FilterState>({
    categories: Object.keys(CATEGORY_LABELS) as PlaceCategory[],
    region: null,
    showVisited: true,
  });
  menuOpen = signal(false);

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
    public auth: AuthService,
    private route: ActivatedRoute,
    private location: Location,
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
  }

  // ── GeoJSON helpers ────────────────────────────────────────────────────────

  private buildGeoJSON(places: Place[]): GeoJSON.FeatureCollection {
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
          name: p.name,
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
        LAYER_UNVISITED, // insert below markers
      );
    } catch {
      // trail line is decorative — ignore errors
    }
  }

  private initLayers(places: Place[]): void {
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

    // Click on empty map = close panel
    this.map.on("click", (e) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: [LAYER_UNVISITED, LAYER_VISITED],
      });
      if (!features.length) this.closePanel();
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

  openPanel(place: Place): void {
    this.selectedPlace.set(place);
    if (this.mapReady && this.map.getLayer(LAYER_SELECTED)) {
      this.map.setFilter(LAYER_SELECTED, ["==", ["get", "id"], place._id]);
    }
    this.map?.flyTo({
      center: [place.coordinates.lng, place.coordinates.lat],
      zoom: Math.max(this.map.getZoom(), 10),
      duration: 600,
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

  onToggleVisit(): void {
    // Signal change triggers refreshSource() via effect
  }

  onSearchSelect(place: Place): void {
    this.openPanel(place);
    this.location.replaceState(`/map/${place._id}`);
  }

  onFilterChange(filters: FilterState): void {
    this.activeFilters.set(filters);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
