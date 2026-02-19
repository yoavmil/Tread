import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  PlaceCategory, PlaceRegion,
  CATEGORY_LABELS
} from '../../../models/place.model';

export interface FilterState {
  categories: PlaceCategory[];
  region: PlaceRegion | null;
  showVisited: boolean;
}

interface CategoryGroup {
  label: string;
  values: PlaceCategory[];
}

const DISPLAY_GROUPS: CategoryGroup[] = [
  { label: CATEGORY_LABELS['nature'], values: ['nature'] },
  { label: CATEGORY_LABELS['historical'], values: ['historical'] },
  { label: CATEGORY_LABELS['trail'], values: ['trail'] },
  { label: CATEGORY_LABELS['city'], values: ['city'] },
];

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  template: `
    <div class="filter-bar">
      @for (group of groups; track group.label) {
        <mat-checkbox
          [checked]="isGroupActive(group)"
          (change)="toggleGroup(group)"
        >{{ group.label }}</mat-checkbox>
      }
      <hr class="filter-divider">
      <mat-checkbox
        [checked]="showVisited"
        (change)="showVisited = !showVisited; emitChange()"
      >ביקרתי</mat-checkbox>
    </div>
  `,
  styles: [`
    .filter-bar {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .filter-divider {
      border: none;
      border-top: 1px solid #e0e0e0;
      margin: 4px 0;
    }
  `]
})
export class FilterBarComponent implements OnInit {
  @Output() filterChange = new EventEmitter<FilterState>();

  groups = DISPLAY_GROUPS;
  selectedCategories: PlaceCategory[] = (Object.keys(CATEGORY_LABELS) as PlaceCategory[]);
  showVisited = true;

  ngOnInit(): void {
    this.emitChange();
  }

  isGroupActive(group: CategoryGroup): boolean {
    return group.values.every(v => this.selectedCategories.includes(v));
  }

  toggleGroup(group: CategoryGroup): void {
    if (this.isGroupActive(group)) {
      this.selectedCategories = this.selectedCategories.filter(c => !group.values.includes(c));
    } else {
      const toAdd = group.values.filter(v => !this.selectedCategories.includes(v));
      this.selectedCategories = [...this.selectedCategories, ...toAdd];
    }
    this.emitChange();
  }

  emitChange(): void {
    this.filterChange.emit({
      categories: this.selectedCategories,
      region: null,
      showVisited: this.showVisited,
    });
  }
}
