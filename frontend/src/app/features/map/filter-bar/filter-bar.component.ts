import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import {
  PlaceCategory, PlaceRegion,
  CATEGORY_LABELS, CATEGORY_COLORS
} from '../../../models/place.model';

export interface FilterState {
  categories: PlaceCategory[];
  region: PlaceRegion | null;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  template: `
    <div class="filter-bar">
      <div class="category-filters">
        @for (cat of categories; track cat.value) {
          <button
            class="cat-btn"
            [class.active]="isActive(cat.value)"
            [style.--cat-color]="cat.color"
            (click)="toggleCategory(cat.value)"
          >
            <span class="cat-dot" [style.background]="cat.color"></span>
            {{ cat.label }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .filter-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow: hidden;
    }

    .category-filters {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    }

    .cat-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 5px 12px;
      border: 1.5px solid #e0e0e0;
      border-radius: 20px;
      background: #fff;
      font-size: 12px;
      font-weight: 500;
      color: #555;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;
      font-family: inherit;

      &:hover {
        border-color: var(--cat-color);
        color: var(--cat-color);
      }

      &.active {
        background: var(--cat-color);
        border-color: var(--cat-color);
        color: #fff;

        .cat-dot {
          background: rgba(255,255,255,0.7) !important;
        }
      }
    }

    .cat-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .filter-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
      }
    }
  `]
})
export class FilterBarComponent {
  @Output() filterChange = new EventEmitter<FilterState>();

  selectedCategories: PlaceCategory[] = [];

  categories = (Object.keys(CATEGORY_LABELS) as PlaceCategory[]).map(v => ({
    value: v,
    label: CATEGORY_LABELS[v],
    color: CATEGORY_COLORS[v]
  }));

  isActive(cat: PlaceCategory): boolean {
    return this.selectedCategories.includes(cat);
  }

  toggleCategory(cat: PlaceCategory): void {
    if (this.isActive(cat)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== cat);
    } else {
      this.selectedCategories = [...this.selectedCategories, cat];
    }
    this.emitChange();
  }

  emitChange(): void {
    this.filterChange.emit({
      categories: this.selectedCategories,
      region: null
    });
  }
}
