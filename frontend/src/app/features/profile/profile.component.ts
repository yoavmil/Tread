import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../core/services/auth.service';
import { PlacesService } from '../../core/services/places.service';
import { VisitsService } from '../../core/services/visits.service';
import { Place, PlaceCategory, CATEGORY_LABELS } from '../../models/place.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatButtonModule,
    MatIconModule, MatProgressBarModule, MatProgressSpinnerModule
  ],
  template: `
    <div class="profile-page">
      <header class="page-header">
        <a routerLink="/map" mat-icon-button class="back-btn">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <h1>My Journey</h1>
        <button mat-stroked-button (click)="auth.logout()">Sign out</button>
      </header>

      @if (loading()) {
        <div class="loading">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      } @else {
        <div class="profile-content">
          <!-- User info -->
          <div class="user-card">
            @if (user()?.photo) {
              <img [src]="user()!.photo" [alt]="user()!.displayName" class="user-avatar" referrerpolicy="no-referrer">
            }
            <div class="user-info">
              <h2>{{ user()?.displayName }}</h2>
              <p>{{ user()?.email }}</p>
            </div>
          </div>

          <!-- Overall progress -->
          <div class="stat-card overall">
            <div class="stat-header">
              <span class="stat-label">Overall Progress</span>
              <span class="stat-value">{{ visitedCount() }} / {{ allPlaces().length }}</span>
            </div>
            <mat-progress-bar
              mode="determinate"
              [value]="overallPercent()"
              class="overall-bar"
            ></mat-progress-bar>
            <p class="stat-sub">{{ overallPercent() }}% of Israel explored</p>
          </div>

          <!-- Category breakdown -->
          <div class="section">
            <h3 class="section-title">By Category</h3>
            <div class="category-grid">
              @for (cat of categoryStats(); track cat.key) {
                <div class="cat-stat">
                  <div class="cat-header">
                    <span class="cat-dot" [style.background]="cat.color"></span>
                    <span class="cat-name">{{ cat.label }}</span>
                    <span class="cat-count">{{ cat.visited }}/{{ cat.total }}</span>
                  </div>
                  <mat-progress-bar
                    mode="determinate"
                    [value]="cat.percent"
                    [style.--mdc-linear-progress-active-indicator-color]="cat.color"
                  ></mat-progress-bar>
                </div>
              }
            </div>
          </div>

          <!-- Visited places list -->
          @if (visitedPlaces().length > 0) {
            <div class="section">
              <h3 class="section-title">Places Visited</h3>
              <div class="places-list">
                @for (place of visitedPlaces(); track place._id) {
                  <div class="place-item">
                    <div class="place-item-info">
                      <span class="place-cat-dot" [style.background]="getCatColor(place.category)"></span>
                      <div>
                        <p class="place-item-name">{{ place.name }}</p>
                        <p class="place-item-he">{{ place.name }}</p>
                      </div>
                    </div>
                    <button mat-icon-button class="remove-btn" (click)="removeVisit(place)">
                      <mat-icon>close</mat-icon>
                    </button>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .profile-page {
      min-height: 100vh;
      background: #f8f9fa;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      background: #fff;
      border-bottom: 1px solid #e0e0e0;
      position: sticky;
      top: 0;
      z-index: 10;

      h1 {
        font-size: 18px;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0;
      }
    }

    .back-btn { color: #333; }

    .loading {
      display: flex;
      justify-content: center;
      padding: 80px 0;
    }

    .profile-content {
      max-width: 640px;
      margin: 0 auto;
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .user-card {
      background: #fff;
      border-radius: 16px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);

      .user-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }

      .user-info h2 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 4px;
      }

      .user-info p {
        font-size: 13px;
        color: #888;
        margin: 0;
      }
    }

    .stat-card {
      background: #fff;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 10px;
    }

    .stat-label {
      font-weight: 600;
      color: #333;
    }

    .stat-value {
      font-size: 22px;
      font-weight: 700;
      color: #1a3a2a;
    }

    .overall-bar {
      height: 10px;
      border-radius: 5px;
      --mdc-linear-progress-active-indicator-color: #2e7d32;
      --mdc-linear-progress-track-color: #e8f5e9;
    }

    .stat-sub {
      margin: 8px 0 0;
      font-size: 13px;
      color: #888;
    }

    .section {
      background: #fff;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }

    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #333;
      margin: 0 0 16px;
    }

    .category-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .cat-stat {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .cat-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .cat-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .cat-name {
      flex: 1;
      font-size: 13px;
      color: #444;
    }

    .cat-count {
      font-size: 13px;
      font-weight: 600;
      color: #333;
    }

    .places-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .place-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #f5f5f5;

      &:last-child { border-bottom: none; }
    }

    .place-item-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .place-cat-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .place-item-name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin: 0;
    }

    .place-item-he {
      font-size: 12px;
      color: #aaa;
      margin: 2px 0 0;
      direction: rtl;
    }

    .remove-btn {
      color: #ccc;
      width: 32px;
      height: 32px;

      &:hover { color: #f44336; }

      mat-icon { font-size: 18px; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  loading = signal(true);
  allPlaces = signal<Place[]>([]);

  user = this.auth.user;
  visitedPlaceIds = this.auth.visitedPlaceIds;

  visitedCount = computed(() =>
    this.allPlaces().filter(p => this.visitedPlaceIds().has(p._id)).length
  );

  overallPercent = computed(() => {
    const total = this.allPlaces().length;
    return total ? Math.round((this.visitedCount() / total) * 100) : 0;
  });

  visitedPlaces = computed(() =>
    this.allPlaces().filter(p => this.visitedPlaceIds().has(p._id))
  );

  categoryStats = computed(() => {
    const places = this.allPlaces();
    return (Object.keys(CATEGORY_LABELS) as PlaceCategory[]).map(cat => {
      const total = places.filter(p => p.category === cat).length;
      const visited = places.filter(p => p.category === cat && this.visitedPlaceIds().has(p._id)).length;
      return {
        key: cat,
        label: CATEGORY_LABELS[cat],
        color: '#1a3a2a',
        total,
        visited,
        percent: total ? Math.round((visited / total) * 100) : 0
      };
    });
  });

  constructor(
    public auth: AuthService,
    private placesService: PlacesService,
    private visits: VisitsService
  ) {}

  ngOnInit(): void {
    this.placesService.getAll().subscribe({
      next: places => {
        this.allPlaces.set(places);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  getCatColor(cat: PlaceCategory): string {
    return '#1a3a2a';
  }

  removeVisit(place: Place): void {
    this.visits.unmarkVisited(place._id).subscribe();
  }
}
