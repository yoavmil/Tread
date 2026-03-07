import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';

import {
  Place,
  PlaceCategory,
  PlaceRegion,
  TrailDifficulty,
  CATEGORY_LABELS,
  REGION_LABELS,
  DIFFICULTY_LABELS,
} from '../../../models/place.model';
import { NewSubmission } from '../../../models/new-submission.model';
import {
  UnifiedReviewItem,
  EditSubmission,
  EraseDetail,
} from '../../../models/edit-submission.model';
import { SubmissionsService } from '../../../core/services/submissions.service';
import { PlacesService } from '../../../core/services/places.service';

interface FieldDef { key: string; label: string; }

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

type LoadedDetail =
  | { type: 'new';   submission: NewSubmission }
  | { type: 'edit';  submission: EditSubmission }
  | { type: 'erase'; erase: Omit<EraseDetail, 'type'>; place: Place };

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <div class="panel" dir="rtl">

      <!-- Header -->
      <div class="panel-header" [class]="'panel-header--' + (currentItem?.type ?? 'new')">
        <div class="nav-row">
          <button class="nav-btn" [disabled]="currentIdx === 0" (click)="prev()">
            <mat-icon>chevron_right</mat-icon>
          </button>
          <span class="nav-count">{{ currentIdx + 1 }} / {{ internalItems.length }}</span>
          <button class="nav-btn" [disabled]="currentIdx === internalItems.length - 1" (click)="next()">
            <mat-icon>chevron_left</mat-icon>
          </button>
          <span class="type-label">{{ typeLabel }}</span>
        </div>
        <button class="close-btn" (click)="close.emit()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Loading -->
      @if (detailLoading) {
        <div class="detail-loading">
          <mat-spinner diameter="32"></mat-spinner>
        </div>
      } @else if (loadedDetail) {

        @if (loadedDetail.type === 'new') {
          <div class="place-info">
            <div class="header-tags">
              <span class="category-chip">{{ categoryLabel(loadedDetail.submission.placeData) }}</span>
              <span class="region-chip">{{ regionLabel(loadedDetail.submission.placeData) }}</span>
              @if (loadedDetail.submission.placeData.difficulty) {
                <span class="difficulty-chip difficulty-{{ loadedDetail.submission.placeData.difficulty }}">
                  {{ difficultyLabel(loadedDetail.submission.placeData) }}
                </span>
              }
            </div>
            <h2 class="place-name">{{ loadedDetail.submission.placeData.name }}</h2>
            @if (loadedDetail.submission.placeData.aliases?.length) {
              <p class="aliases">נקרא גם: {{ loadedDetail.submission.placeData.aliases!.join(', ') }}</p>
            }
            @if (loadedDetail.submission.placeData.description) {
              <p class="description">{{ loadedDetail.submission.placeData.description }}</p>
            }
            @if (loadedDetail.submission.placeData.externalUrl) {
              <a [href]="loadedDetail.submission.placeData.externalUrl" target="_blank" rel="noopener" class="external-link">
                <mat-icon>open_in_new</mat-icon>
                Learn more
              </a>
            }
          </div>
        }

        @else if (loadedDetail.type === 'erase') {
          <div class="place-info">
            <div class="header-tags">
              <span class="category-chip">{{ categoryLabel(loadedDetail.place) }}</span>
              <span class="region-chip">{{ regionLabel(loadedDetail.place) }}</span>
              @if (loadedDetail.place.difficulty) {
                <span class="difficulty-chip difficulty-{{ loadedDetail.place.difficulty }}">
                  {{ difficultyLabel(loadedDetail.place) }}
                </span>
              }
            </div>
            <h2 class="place-name">{{ loadedDetail.place.name }}</h2>
            @if (loadedDetail.place.aliases.length) {
              <p class="aliases">נקרא גם: {{ loadedDetail.place.aliases.join(', ') }}</p>
            }
            @if (loadedDetail.place.description) {
              <p class="description">{{ loadedDetail.place.description }}</p>
            }
            <div class="erase-reason">
              <span class="reason-label">סיבה למחיקה:</span>
              <span class="reason-text">{{ loadedDetail.erase.reason || '(לא צוינה סיבה)' }}</span>
            </div>
          </div>
        }

        @else if (loadedDetail.type === 'edit') {
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

        @if (currentItem?.submittedBy?.displayName) {
          <p class="submitted-by">הוגש ע"י: {{ currentItem!.submittedBy.displayName }}</p>
        }
      }

      <!-- Footer -->
      <div class="panel-footer">
        <button mat-stroked-button class="decline-btn"
          [disabled]="approving || declining || detailLoading"
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
          [color]="currentItem?.type === 'erase' ? 'warn' : 'primary'"
          class="approve-btn"
          [disabled]="approving || declining || detailLoading"
          (click)="onApprove()">
          @if (approving) {
            <mat-spinner diameter="18"></mat-spinner>
          } @else {
            <ng-container>
              <mat-icon>{{ currentItem?.type === 'erase' ? 'delete_forever' : 'check' }}</mat-icon>
              {{ currentItem?.type === 'erase' ? 'אשר מחיקה' : 'אשר' }}
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
      box-shadow: 0 4px 32px rgba(0,0,0,0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideIn 0.2s ease-out;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    @media (max-width: 768px) {
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(40px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    }

    /* Colored top border by type */
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px 8px;
      border-bottom: 1px solid #f0f0f0;
      gap: 8px;
      border-top: 4px solid transparent;
    }
    .panel-header--new   { border-top-color: #2e7d32; }
    .panel-header--edit  { border-top-color: #F59E0B; }
    .panel-header--erase { border-top-color: #e53935; }

    .nav-row {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
    }

    .type-label {
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

    .detail-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }

    /* Place info (new + erase) */
    .place-info {
      padding: 12px 16px 8px;
      overflow-y: auto;
    }

    .header-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }

    .category-chip, .region-chip, .difficulty-chip {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .category-chip { background: #1a3a2a22; color: #1a3a2a; }
    .region-chip   { background: #f5f5f5; color: #666; }
    .difficulty-easy     { background: #e8f5e9; color: #2e7d32; }
    .difficulty-moderate { background: #fff3e0; color: #e65100; }
    .difficulty-hard     { background: #fce4ec; color: #c62828; }

    .place-name {
      font-size: 20px;
      font-weight: 700;
      color: #1a3a2a;
      margin: 0 0 4px;
    }

    .aliases {
      font-size: 13px;
      color: #888;
      margin: 0 0 8px;
    }

    .description {
      font-size: 14px;
      color: #444;
      line-height: 1.6;
      margin: 0 0 12px;
    }

    .external-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: #1976d2;
      text-decoration: none;
      mat-icon { font-size: 15px; width: 15px; height: 15px; }
    }

    .erase-reason {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 12px;
      padding: 10px 12px;
      background: #fce4ec;
      border-radius: 8px;
    }

    .reason-label {
      font-size: 11px;
      font-weight: 700;
      color: #c62828;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .reason-text {
      font-size: 14px;
      color: #333;
      line-height: 1.5;
    }

    /* Edit comparison table */
    .comparison-table {
      display: grid;
      grid-template-columns: 80px 1fr 1fr;
      padding: 8px 0;
      font-size: 13px;
      overflow-y: auto;
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

    .field-before, .field-after {
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
      border-color: #e53935 !important;
      color: #e53935 !important;
    }
  `],
})
export class ReviewsComponent implements OnChanges {
  @Input() items: UnifiedReviewItem[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() newPlaceApproved = new EventEmitter<string>();
  @Output() eraseApproved = new EventEmitter<string>();
  @Output() editApproved = new EventEmitter<{ placeId: string; after: Partial<Place> }>();
  @Output() itemRemoved = new EventEmitter<string>();

  internalItems: UnifiedReviewItem[] = [];
  currentIdx = 0;
  loadedDetail: LoadedDetail | null = null;
  detailLoading = false;
  approving = false;
  declining = false;

  readonly fields = FIELDS;

  constructor(
    private submissionsService: SubmissionsService,
    private placesService: PlacesService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && changes['items'].firstChange) {
      this.internalItems = [...this.items];
      if (this.internalItems.length > 0) {
        this.loadCurrentDetail();
      }
    }
  }

  get currentItem(): UnifiedReviewItem | null {
    return this.internalItems[this.currentIdx] ?? null;
  }

  get typeLabel(): string {
    switch (this.currentItem?.type) {
      case 'new':   return 'מקום חדש';
      case 'edit':  return 'עריכה ממתינה';
      case 'erase': return 'מחיקה ממתינה';
      default:      return '';
    }
  }

  loadCurrentDetail(): void {
    const item = this.currentItem;
    if (!item) return;
    this.loadedDetail = null;
    this.detailLoading = true;
    this.approving = false;
    this.declining = false;

    if (item.type === 'new') {
      this.submissionsService.getById(item._id).subscribe({
        next: (sub) => { this.loadedDetail = { type: 'new', submission: sub }; this.detailLoading = false; },
        error: () => { this.detailLoading = false; },
      });
    } else if (item.type === 'edit') {
      this.submissionsService.getEditById(item._id).subscribe({
        next: (sub) => { this.loadedDetail = { type: 'edit', submission: sub }; this.detailLoading = false; },
        error: () => { this.detailLoading = false; },
      });
    } else {
      forkJoin([
        this.submissionsService.getEraseById(item._id),
        this.placesService.getById(item.placeId._id),
      ]).subscribe({
        next: ([erase, place]) => { this.loadedDetail = { type: 'erase', erase, place }; this.detailLoading = false; },
        error: () => { this.detailLoading = false; },
      });
    }
  }

  next(): void {
    if (this.currentIdx < this.internalItems.length - 1) {
      this.currentIdx++;
      this.loadCurrentDetail();
    }
  }

  prev(): void {
    if (this.currentIdx > 0) {
      this.currentIdx--;
      this.loadCurrentDetail();
    }
  }

  onApprove(): void {
    const item = this.currentItem;
    if (!item) return;
    this.approving = true;

    if (item.type === 'new') {
      this.submissionsService.approve(item._id).subscribe({
        next: (result) => { this.newPlaceApproved.emit(result.placeId); this.removeCurrentItem(); },
        error: () => { this.approving = false; },
      });
    } else if (item.type === 'edit') {
      const detail = this.loadedDetail as { type: 'edit'; submission: EditSubmission };
      this.submissionsService.approveEdit(item._id).subscribe({
        next: () => { this.editApproved.emit({ placeId: item.placeId._id, after: detail.submission.after }); this.removeItemsForPlace(item.placeId._id); },
        error: () => { this.approving = false; },
      });
    } else {
      this.submissionsService.approveErase(item._id).subscribe({
        next: () => { this.eraseApproved.emit(item.placeId._id); this.removeItemsForPlace(item.placeId._id); },
        error: () => { this.approving = false; },
      });
    }
  }

  onDecline(): void {
    const item = this.currentItem;
    if (!item) return;
    this.declining = true;

    const decline$ = item.type === 'new'
      ? this.submissionsService.decline(item._id)
      : item.type === 'edit'
        ? this.submissionsService.declineEdit(item._id)
        : this.submissionsService.declineErase(item._id);

    decline$.subscribe({
      next: () => { this.removeCurrentItem(); },
      error: () => { this.declining = false; },
    });
  }

  private removeCurrentItem(): void {
    const item = this.currentItem;
    if (!item) return;
    this.itemRemoved.emit(item._id);
    this.internalItems = this.internalItems.filter(i => i._id !== item._id);
    if (this.internalItems.length === 0) {
      this.close.emit();
      return;
    }
    this.currentIdx = Math.min(this.currentIdx, this.internalItems.length - 1);
    this.loadCurrentDetail();
  }

  private removeItemsForPlace(placeId: string): void {
    const toRemove = this.internalItems.filter(i =>
      (i.type === 'edit' || i.type === 'erase') && i.placeId._id === placeId
    );
    toRemove.forEach(i => this.itemRemoved.emit(i._id));
    this.internalItems = this.internalItems.filter(i =>
      !((i.type === 'edit' || i.type === 'erase') && i.placeId._id === placeId)
    );
    if (this.internalItems.length === 0) {
      this.close.emit();
      return;
    }
    this.currentIdx = Math.min(this.currentIdx, this.internalItems.length - 1);
    this.loadCurrentDetail();
  }

  // Edit comparison helpers
  hasChange(key: string): boolean {
    if (this.loadedDetail?.type !== 'edit') return false;
    const { submission } = this.loadedDetail;
    const after = (submission.after ?? {}) as Record<string, unknown>;
    if (!(key in after)) return false;
    return JSON.stringify((submission.before as Record<string, unknown>)[key]) !== JSON.stringify(after[key]);
  }

  getBeforeValue(key: string): unknown {
    if (this.loadedDetail?.type !== 'edit') return undefined;
    return (this.loadedDetail.submission.before as Record<string, unknown>)[key];
  }

  getAfterValue(key: string): unknown {
    if (this.loadedDetail?.type !== 'edit') return undefined;
    const { submission } = this.loadedDetail;
    const after = (submission.after ?? {}) as Record<string, unknown>;
    return key in after ? after[key] : (submission.before as Record<string, unknown>)[key];
  }

  displayValue(val: unknown, key: string): string {
    if (val == null || val === '') return '—';
    if (Array.isArray(val)) return val.join(', ') || '—';
    if (key === 'category')   return CATEGORY_LABELS[val as PlaceCategory] ?? String(val);
    if (key === 'region')     return REGION_LABELS[val as PlaceRegion] ?? String(val);
    if (key === 'difficulty') return val ? (DIFFICULTY_LABELS[val as NonNullable<TrailDifficulty>] ?? String(val)) : '—';
    if (key === 'coordinates' && typeof val === 'object') {
      const c = val as { lat: number; lng: number };
      return `${c.lat.toFixed(5)}, ${c.lng.toFixed(5)}`;
    }
    return String(val);
  }

  categoryLabel(place: Partial<Place>): string {
    return place.category ? (CATEGORY_LABELS[place.category] ?? place.category) : '—';
  }

  regionLabel(place: Partial<Place>): string {
    return place.region ? (REGION_LABELS[place.region] ?? place.region) : '—';
  }

  difficultyLabel(place: Partial<Place>): string {
    return place.difficulty ? (DIFFICULTY_LABELS[place.difficulty] ?? place.difficulty) : '';
  }
}
