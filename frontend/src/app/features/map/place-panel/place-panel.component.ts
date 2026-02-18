import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Place, CATEGORY_LABELS, CATEGORY_COLORS, REGION_LABELS } from '../../../models/place.model';
import { VisitsService } from '../../../core/services/visits.service';

@Component({
  selector: 'app-place-panel',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatProgressSpinnerModule
  ],
  template: `
    <div class="panel">
      <!-- Handle bar for mobile -->
      <div class="drag-handle"></div>

      <div class="panel-header">
        <div class="header-tags">
          <span class="category-chip" [style.background]="categoryColor + '22'" [style.color]="categoryColor">
            {{ categoryLabel }}
          </span>
          <span class="region-chip">{{ regionLabel }}</span>
          @if (place.difficulty) {
            <span class="difficulty-chip difficulty-{{ place.difficulty }}">
              {{ place.difficulty }}
            </span>
          }
        </div>
        <button mat-icon-button class="close-btn" (click)="close.emit()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="panel-body">
        <h2 class="place-name">{{ place.name }}</h2>
        @if (place.nameHe) {
          <p class="place-name-he">{{ place.nameHe }}</p>
        }

        @if (place.description) {
          <p class="description">{{ place.description }}</p>
        }

        @if (place.externalUrl) {
          <a [href]="place.externalUrl" target="_blank" rel="noopener" class="external-link">
            <mat-icon>open_in_new</mat-icon>
            Learn more
          </a>
        }
      </div>

      <div class="panel-footer">
        @if (isVisited) {
          <button
            mat-stroked-button
            class="visit-btn visited"
            [disabled]="saving"
            (click)="unmarkVisited()"
          >
            @if (saving) {
              <mat-spinner diameter="18"></mat-spinner>
            } @else {
              <mat-icon>check_circle</mat-icon>
              Visited
            }
          </button>
        } @else {
          <button
            mat-flat-button
            class="visit-btn"
            color="primary"
            [disabled]="saving"
            (click)="markVisited()"
          >
            @if (saving) {
              <mat-spinner diameter="18"></mat-spinner>
            } @else {
              <mat-icon>add_circle_outline</mat-icon>
              Mark as Visited
            }
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .panel {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 32px rgba(0,0,0,0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideIn 0.2s ease-out;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @media (max-width: 768px) {
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }
    }

    .drag-handle {
      display: none;
      width: 40px;
      height: 4px;
      background: #e0e0e0;
      border-radius: 2px;
      margin: 10px auto 0;
    }

    @media (max-width: 768px) {
      .drag-handle { display: block; }
    }

    .panel-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 12px 16px 0;
      gap: 8px;
    }

    .header-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding-top: 4px;
    }

    .category-chip, .region-chip, .difficulty-chip {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .region-chip {
      background: #f5f5f5;
      color: #666;
    }

    .difficulty-easy   { background: #e8f5e9; color: #2e7d32; }
    .difficulty-moderate { background: #fff3e0; color: #e65100; }
    .difficulty-hard   { background: #fce4ec; color: #c62828; }

    .close-btn {
      flex-shrink: 0;
      color: #999;
    }

    .panel-body {
      padding: 8px 16px 16px;
      overflow-y: auto;
      flex: 1;
    }

    .place-name {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 4px;
      line-height: 1.3;
    }

    .place-name-he {
      font-size: 16px;
      color: #888;
      margin: 0 0 12px;
      direction: rtl;
      text-align: right;
      font-weight: 400;
    }

    .description {
      font-size: 14px;
      color: #444;
      line-height: 1.6;
      margin: 0 0 16px;
    }

    .external-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: #1976d2;
      text-decoration: none;
    }

    .external-link mat-icon {
      font-size: 15px;
      width: 15px;
      height: 15px;
    }

    .panel-footer {
      padding: 12px 16px;
      border-top: 1px solid #f0f0f0;
    }

    .visit-btn {
      width: 100%;
      height: 44px;
      font-size: 14px;
      font-weight: 600;
      gap: 6px;
    }

    .visit-btn.visited {
      border-color: #4caf50 !important;
      color: #2e7d32 !important;
    }

    .visit-btn mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
  `]
})
export class PlacePanelComponent {
  @Input() place!: Place;
  @Input() isVisited = false;
  @Output() close = new EventEmitter<void>();
  @Output() toggleVisit = new EventEmitter<Place>();

  saving = false;

  get categoryLabel(): string {
    return CATEGORY_LABELS[this.place.category];
  }

  get categoryColor(): string {
    return CATEGORY_COLORS[this.place.category];
  }

  get regionLabel(): string {
    return REGION_LABELS[this.place.region];
  }

  constructor(private visits: VisitsService) {}

  markVisited(): void {
    this.saving = true;
    this.visits.markVisited(this.place._id).subscribe({
      next: () => { this.saving = false; this.toggleVisit.emit(this.place); },
      error: () => { this.saving = false; }
    });
  }

  unmarkVisited(): void {
    this.saving = true;
    this.visits.unmarkVisited(this.place._id).subscribe({
      next: () => { this.saving = false; this.toggleVisit.emit(this.place); },
      error: () => { this.saving = false; }
    });
  }
}
