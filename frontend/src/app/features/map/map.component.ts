import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ElementRef, ViewChild, signal, computed, effect
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';

import { PlacesService } from '../../core/services/places.service';
import { AuthService } from '../../core/services/auth.service';
import { Place, PlaceCategory, PlaceRegion, CATEGORY_COLORS } from '../../models/place.model';
import { environment } from '../../../environments/environment';
import { FilterBarComponent, FilterState } from './filter-bar/filter-bar.component';
import { PlacePanelComponent } from './place-panel/place-panel.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatProgressSpinnerModule,
    MatIconModule, MatButtonModule,
    FilterBarComponent, PlacePanelComponent
  ],
  template: `
    <div class="map-page">
      <!-- Header -->
      <header class="map-header">
        <div class="header-left">
          <span class="app-logo">Tread</span>
        </div>
        <div class="header-center">
          <app-filter-bar (filterChange)="onFilterChange($event)" />
        </div>
        <div class="header-right">
          <span class="visit-count">
            {{ visitedCount() }} / {{ allPlaces().length }} visited
          </span>
          <a routerLink="/profile" class="avatar-btn">
            @if (user()?.photo) {
              <img [src]="user()!.photo" [alt]="user()!.displayName" class="avatar" referrerpolicy="no-referrer">
            } @else {
              <span class="avatar-placeholder">{{ userInitial() }}</span>
            }
          </a>
        </div>
      </header>

      <!-- Map container -->
      <div class="map-container">
        <div #mapEl class="mapbox-map"></div>

        @if (loading()) {
          <div class="map-loading">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
        }

        <!-- Place panel -->
        @if (selectedPlace()) {
          <app-place-panel
            [place]="selectedPlace()!"
            [isVisited]="isVisited(selectedPlace()!._id)"
            (close)="closePanel()"
            (toggleVisit)="onToggleVisit($event)"
            class="place-panel"
          />
        }
      </div>
    </div>
  `,
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapEl') mapEl!: ElementRef<HTMLDivElement>;

  private map!: mapboxgl.Map;
  private markers = new Map<string, mapboxgl.Marker>();
  private sub?: Subscription;

  loading = signal(true);
  allPlaces = signal<Place[]>([]);
  filteredPlaces = signal<Place[]>([]);
  selectedPlace = signal<Place | null>(null);
  activeFilters = signal<FilterState>({ categories: [], region: null });

  visitedCount = computed(() =>
    this.allPlaces().filter(p => this.auth.visitedPlaceIds().has(p._id)).length
  );

  user = this.auth.user;
  userInitial = computed(() => this.auth.user()?.displayName?.charAt(0).toUpperCase() ?? '?');
  isVisited = (id: string) => this.auth.visitedPlaceIds().has(id);

  constructor(
    private placesService: PlacesService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Re-render markers whenever visited set changes
    effect(() => {
      this.auth.visitedPlaceIds(); // track signal
      this.updateMarkerStyles();
    });

    // Re-apply filter when it changes
    effect(() => {
      const filters = this.activeFilters();
      const places = this.allPlaces();
      this.applyFilter(places, filters);
    });
  }

  ngOnInit(): void {
    this.placesService.getAll().subscribe({
      next: places => {
        this.allPlaces.set(places);
        this.filteredPlaces.set(places);
        this.loading.set(false);
        this.addMarkersToMap(places);

        // Open panel if placeId in route
        const placeId = this.route.snapshot.paramMap.get('placeId');
        if (placeId) {
          const place = places.find(p => p._id === placeId);
          if (place) this.openPanel(place);
        }
      },
      error: () => this.loading.set(false)
    });
  }

  ngAfterViewInit(): void {
    (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = environment.mapboxToken;

    this.map = new mapboxgl.Map({
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [35.0, 31.5],
      zoom: 7,
      minZoom: 5,
      maxZoom: 16
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Fit Israel bounds
    this.map.fitBounds([[34.2, 29.4], [35.9, 33.4]], { padding: 40, duration: 0 });
  }

  private addMarkersToMap(places: Place[]): void {
    if (!this.map) return;

    const waitForLoad = () => {
      if (!this.map.isStyleLoaded()) {
        setTimeout(waitForLoad, 100);
        return;
      }
      places.forEach(place => this.createMarker(place));
    };
    waitForLoad();
  }

  private createMarker(place: Place): void {
    const el = document.createElement('div');
    el.className = 'place-marker';
    el.dataset['placeId'] = place._id;
    this.styleMarkerEl(el, place);

    const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
      .setLngLat([place.coordinates.lng, place.coordinates.lat])
      .addTo(this.map);

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openPanel(place);
      this.router.navigate(['/map', place._id]);
    });

    this.markers.set(place._id, marker);
  }

  private styleMarkerEl(el: HTMLElement, place: Place): void {
    const color = CATEGORY_COLORS[place.category];
    const isVisited = this.auth.visitedPlaceIds().has(place._id);

    el.style.cssText = `
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: ${isVisited ? '#4caf50' : color};
      border: 2.5px solid ${isVisited ? '#fff' : 'rgba(255,255,255,0.8)'};
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s;
    `;

    if (isVisited) {
      el.innerHTML = `<span style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 7px;
        color: white;
        line-height: 1;
      ">✓</span>`;
      el.style.position = 'relative';
    } else {
      el.innerHTML = '';
    }
  }

  private updateMarkerStyles(): void {
    this.allPlaces().forEach(place => {
      const marker = this.markers.get(place._id);
      if (marker) {
        this.styleMarkerEl(marker.getElement(), place);
      }
    });
  }

  openPanel(place: Place): void {
    this.selectedPlace.set(place);
    // Fly to place
    if (this.map) {
      this.map.flyTo({
        center: [place.coordinates.lng, place.coordinates.lat],
        zoom: Math.max(this.map.getZoom(), 10),
        duration: 600
      });
    }
  }

  closePanel(): void {
    this.selectedPlace.set(null);
    this.router.navigate(['/map']);
  }

  onToggleVisit(place: Place): void {
    // Handled by PlacePanelComponent — just update marker styles after
    setTimeout(() => this.updateMarkerStyles(), 50);
  }

  onFilterChange(filters: FilterState): void {
    this.activeFilters.set(filters);
  }

  private applyFilter(places: Place[], filters: FilterState): void {
    let result = places;

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    if (filters.region) {
      result = result.filter(p => p.region === filters.region);
    }

    this.filteredPlaces.set(result);

    // Show/hide markers
    this.markers.forEach((marker, id) => {
      const el = marker.getElement();
      const visible = result.some(p => p._id === id);
      el.style.display = visible ? '' : 'none';
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.markers.forEach(m => m.remove());
    this.map?.remove();
  }
}
