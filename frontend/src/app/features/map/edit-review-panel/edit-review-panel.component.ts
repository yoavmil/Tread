import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  PlaceCategory,
  PlaceRegion,
  TrailDifficulty,
  CATEGORY_LABELS,
  REGION_LABELS,
  DIFFICULTY_LABELS,
} from '../../../models/place.model';
import { ReviewDetail } from '../../../models/edit-submission.model';

interface FieldDef {
  key: string;
  label: string;
}

const FIELDS: FieldDef[] = [
  { key: 'name',        label: 'שם' },
  { key: 'description', label: 'תיאור' },
  { key: 'category',    label: 'קטגוריה' },
  { key: 'region',      label: 'אזור' },
  { key: 'difficulty',  label: 'קושי' },
  { key: 'aliases',     label: 'שמות נוספים' },
  { key: 'externalUrl', label: 'קישור' },
  { key: 'coordinates', label: 'מיקום' },
];

@Component({
  selector: 'app-edit-review-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <div class="panel" dir="rtl">
      <div class="panel-header">
        <div class="nav-row">
          <button class="nav-btn" [disabled]="currentIndex === 0" (click)="prev.emit()">
            <mat-icon>chevron_right</mat-icon>
          </button>
          <span class="nav-count">{{ currentIndex + 1 }} / {{ totalCount }}</span>
          <button class="nav-btn" [disabled]="currentIndex === totalCount - 1" (click)="next.emit()">
            <mat-icon>chevron_left</mat-icon>
          </button>
          <span class="header-title">{{ detail.type === 'erase' ? 'מחיקה ממתינה' : 'עריכה ממתינה' }}</span>
        </div>
        <button class="close-btn" (click)="close.emit()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      @if (detail.type === 'erase') {
        <div class="erase-info">
          <p class="erase-place-name">{{ detail.placeId.name }}</p>
          <p class="erase-label">סיבה:</p>
          <p class="erase-reason">{{ detail.reason || '(לא צוינה סיבה)' }}</p>
        </div>
      } @else {
        <div class="comparison-table">
          <div class="col-header before-header">לפני</div>
          <div class="col-header after-header">אחרי</div>

          @for (field of fields; track field.key) {
            <div class="field-label">{{ field.label }}</div>
            <div class="field-before">{{ displayValue(getBeforeValue(field.key), field.key) }}</div>
            <div class="field-after" [class.changed]="hasChange(field.key)">
              {{ displayValue(getAfterValue(field.key), field.key) }}
              @if (hasChange(field.key)) {
                <mat-icon class="change-icon">edit</mat-icon>
              }
            </div>
          }
        </div>
      }

      @if (detail.submittedBy.displayName) {
        <p class="submitted-by">הוגש ע"י: {{ detail.submittedBy.displayName }}</p>
      }

      <div class="panel-footer">
        <button mat-stroked-button class="decline-btn"
          [disabled]="approving || declining"
          (click)="onDecline()">
          @if (declining) {
            <mat-spinner diameter="18"></mat-spinner>
          } @else {
            <ng-container>
              <mat-icon>close</mat-icon>
              דחה
            </ng-container>
          }
        </button>
        <button mat-flat-button
          [color]="detail.type === 'erase' ? 'warn' : 'primary'"
          class="approve-btn"
          [disabled]="approving || declining"
          (click)="onApprove()">
          @if (approving) {
            <mat-spinner diameter="18"></mat-spinner>
          } @else {
            <ng-container>
              <mat-icon>{{ detail.type === 'erase' ? 'delete_forever' : 'check' }}</mat-icon>
              {{ detail.type === 'erase' ? 'אשר מחיקה' : 'אשר' }}
            </ng-container>
          }
        </button>
      </div>
    </div>
  `,
  styles: [`
    .panel {
      background: #fff;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px 8px;
      border-bottom: 1px solid #f0f0f0;
      gap: 8px;
    }

    .nav-row {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
    }

    .header-title {
      font-size: 14px;
      font-weight: 700;
      color: #1a3a2a;
      margin-right: 8px;
    }

    .nav-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #555;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      padding: 0;

      &:hover:not([disabled]) { background: #f0f0f0; }
      &[disabled] { color: #ccc; cursor: default; }

      mat-icon { font-size: 20px; width: 20px; height: 20px; }
    }

    .nav-count {
      font-size: 13px;
      color: #777;
      min-width: 36px;
      text-align: center;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #777;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      padding: 0;
      flex-shrink: 0;

      &:hover { background: #f0f0f0; }
      mat-icon { font-size: 20px; width: 20px; height: 20px; }
    }

    .comparison-table {
      display: grid;
      grid-template-columns: 80px 1fr 1fr;
      padding: 8px 0;
      font-size: 13px;
    }

    .col-header {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #aaa;
      padding: 4px 12px 8px;
      border-bottom: 1px solid #f0f0f0;
    }

    .before-header { grid-column: 2; }
    .after-header  { grid-column: 3; }

    .field-label {
      padding: 7px 12px;
      color: #888;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #fafafa;
    }

    .field-before,
    .field-after {
      padding: 7px 12px;
      border-bottom: 1px solid #fafafa;
      color: #333;
      word-break: break-word;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .field-after.changed {
      background: #FEF3C7;
      border-left: 3px solid #F59E0B;
      font-weight: 600;
      color: #92400E;
    }

    .change-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
      color: #F59E0B;
      flex-shrink: 0;
    }

    .erase-info {
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .erase-place-name {
      font-size: 18px;
      font-weight: 700;
      color: #1a3a2a;
      margin: 0 0 8px;
    }

    .erase-label {
      font-size: 12px;
      font-weight: 600;
      color: #888;
      margin: 0;
    }

    .erase-reason {
      font-size: 14px;
      color: #333;
      margin: 0;
      line-height: 1.5;
    }

    .submitted-by {
      font-size: 12px;
      color: #888;
      padding: 8px 16px 4px;
      margin: 0;
    }

    .panel-footer {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      padding: 12px 16px;
      border-top: 1px solid #f0f0f0;

      button {
        display: flex;
        align-items: center;
        gap: 6px;
        mat-icon { font-size: 18px; width: 18px; height: 18px; }
      }
    }

    .decline-btn {
      border-color: #e53935;
      color: #e53935;
    }
  `]
})
export class EditReviewPanelComponent {
  @Input() detail!: ReviewDetail;
  @Input() currentIndex = 0;
  @Input() totalCount = 0;
  @Output() close = new EventEmitter<void>();
  @Output() approve = new EventEmitter<void>();
  @Output() decline = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  approving = false;
  declining = false;

  readonly fields = FIELDS;

  hasChange(key: string): boolean {
    if (this.detail.type === 'erase') return false;
    const after = (this.detail.after ?? {}) as Record<string, unknown>;
    if (!(key in after)) return false;
    return JSON.stringify((this.detail.before as Record<string, unknown>)[key])
      !== JSON.stringify(after[key]);
  }

  getBeforeValue(key: string): unknown {
    if (this.detail.type === 'erase') return undefined;
    return (this.detail.before as Record<string, unknown>)[key];
  }

  getAfterValue(key: string): unknown {
    if (this.detail.type === 'erase') return undefined;
    const after = (this.detail.after ?? {}) as Record<string, unknown>;
    return key in after
      ? after[key]
      : (this.detail.before as Record<string, unknown>)[key];
  }

  displayValue(val: unknown, key: string): string {
    if (val == null || val === '') return '—';
    if (Array.isArray(val)) return val.join(', ') || '—';
    if (key === 'category') return CATEGORY_LABELS[val as PlaceCategory] ?? String(val);
    if (key === 'region')   return REGION_LABELS[val as PlaceRegion] ?? String(val);
    if (key === 'difficulty') {
      return val ? (DIFFICULTY_LABELS[val as NonNullable<TrailDifficulty>] ?? String(val)) : '—';
    }
    if (key === 'coordinates' && typeof val === 'object') {
      const c = val as { lat: number; lng: number };
      return `${c.lat.toFixed(5)}, ${c.lng.toFixed(5)}`;
    }
    return String(val);
  }

  onApprove(): void {
    this.approving = true;
    this.approve.emit();
  }

  onDecline(): void {
    this.declining = true;
    this.decline.emit();
  }
}
