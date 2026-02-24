import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  PlaceCategory,
  CATEGORY_LABELS,
  FilterState,
} from '../../../models/place.model';
import { FilterStateService } from '../../../core/services/filter-state.service';
import { AuthService } from '../../../core/services/auth.service';

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
      @if (auth.user()?.role === 'approver') {
        <mat-checkbox
          [checked]="showPendingSubmissions"
          (change)="showPendingSubmissions = !showPendingSubmissions; emitChange()"
        >מקומות חדשים</mat-checkbox>
        <mat-checkbox
          [checked]="showPendingEdits"
          [disabled]="pendingEditsCount === 0"
          (change)="togglePendingEdits()"
        >עריכות לאישור{{ pendingEditsCount > 0 ? ' (' + pendingEditsCount + ')' : '' }}</mat-checkbox>
      }
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
export class FilterBarComponent implements OnInit, OnChanges {
  @Input() pendingEditsCount = 0;
  @Output() filterChange = new EventEmitter<FilterState>();
  @Output() pendingEditsEnabled = new EventEmitter<void>();

  groups = DISPLAY_GROUPS;
  selectedCategories: PlaceCategory[] = [];
  showVisited = true;
  showPendingSubmissions = false;
  showPendingEdits = false;

  constructor(
    private filterStateService: FilterStateService,
    public auth: AuthService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pendingEditsCount'] && this.pendingEditsCount === 0 && this.showPendingEdits) {
      this.showPendingEdits = false;
      this.emitChange();
    }
  }

  ngOnInit(): void {
    const saved = this.filterStateService.state();
    this.selectedCategories = [...saved.categories];
    this.showVisited = saved.showVisited;
    this.showPendingSubmissions = saved.showPendingSubmissions;
    this.showPendingEdits = saved.showPendingEdits;
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

  togglePendingEdits(): void {
    this.showPendingEdits = !this.showPendingEdits;
    this.emitChange();
    if (this.showPendingEdits) this.pendingEditsEnabled.emit();
  }

  emitChange(): void {
    const state: FilterState = {
      categories: this.selectedCategories,
      region: null,
      showVisited: this.showVisited,
      showPendingSubmissions: this.showPendingSubmissions,
      showPendingEdits: this.showPendingEdits,
    };
    this.filterStateService.set(state);
    this.filterChange.emit(state);
  }
}
