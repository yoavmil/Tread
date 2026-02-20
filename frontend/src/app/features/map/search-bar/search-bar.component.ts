import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Place, CATEGORY_LABELS, REGION_LABELS } from '../../../models/place.model';
import { PlacesService } from '../../../core/services/places.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="search-wrap">
      <div class="search-box">
        <mat-icon class="search-icon">search</mat-icon>
        <input
          class="search-input"
          type="text"
          placeholder="חפש מקום..."
          [value]="query"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown.escape)="clear()"
          autocomplete="off"
          dir="rtl"
        />
        @if (query) {
          <button class="clear-btn" (mousedown)="$event.preventDefault()" (click)="clear()">
            <mat-icon>close</mat-icon>
          </button>
        }
      </div>

      @if (open && results.length > 0) {
        <ul class="results">
          @for (place of results; track place._id) {
            <li class="result-item" (mousedown)="$event.preventDefault()" (click)="select(place)">
              <span class="result-name">{{ place.name }}</span>
              @if (place.aliases.length) {
                <span class="result-alias">({{ place.aliases.join(', ') }})</span>
              }
              <span class="result-meta">{{ categoryLabel(place) }} · {{ regionLabel(place) }}</span>
            </li>
          }
        </ul>
      }

      @if (open && query.length >= 2 && !loading && results.length === 0) {
        <div class="no-results">לא נמצאו תוצאות</div>
      }
    </div>
  `,
  styles: [`
    .search-wrap {
      position: relative;
      width: 100%;
      max-width: 360px;
    }

    .search-box {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      border-radius: 24px;
      padding: 0 12px;
      gap: 6px;
      height: 38px;
      border: 1.5px solid transparent;
      transition: border-color 0.15s, background 0.15s;
    }

    .search-box:focus-within {
      background: #fff;
      border-color: #1a3a2a;
    }

    .search-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #888;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 14px;
      color: #1a1a1a;
      min-width: 0;

      &::placeholder { color: #aaa; }
    }

    .clear-btn {
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      color: #aaa;
      flex-shrink: 0;

      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }

    .results, .no-results {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
      z-index: 500;
      overflow: hidden;
      list-style: none;
      margin: 0;
      padding: 4px 0;
    }

    .no-results {
      padding: 12px 16px;
      font-size: 13px;
      color: #888;
      text-align: center;
    }

    .result-item {
      padding: 10px 16px;
      cursor: pointer;
      display: flex;
      align-items: baseline;
      gap: 6px;
      flex-wrap: wrap;

      &:hover { background: #f5f5f5; }
    }

    .result-name {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .result-alias {
      font-size: 12px;
      color: #888;
    }

    .result-meta {
      font-size: 11px;
      color: #aaa;
      margin-left: auto;
    }
  `]
})
export class SearchBarComponent implements OnDestroy {
  @Output() placeSelected = new EventEmitter<Place>();

  query = '';
  results: Place[] = [];
  loading = false;
  open = false;

  private search$ = new Subject<string>();
  private sub: Subscription;

  constructor(private places: PlacesService) {
    this.sub = this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => {
        if (q.length < 2) { this.results = []; return of([]); }
        this.loading = true;
        return this.places.search(q);
      })
    ).subscribe({
      next: (results) => { this.results = results; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  onInput(e: Event): void {
    this.query = (e.target as HTMLInputElement).value;
    if (!this.query.trim()) {
      this.results = [];
      this.open = false;
      return;
    }
    this.open = true;
    this.search$.next(this.query.trim());
  }

  onFocus(): void {
    if (this.results.length > 0) this.open = true;
  }

  onBlur(): void {
    setTimeout(() => { this.open = false; }, 150);
  }

  select(place: Place): void {
    this.placeSelected.emit(place);
    this.query = place.name;
    this.open = false;
    this.results = [];
  }

  clear(): void {
    this.query = '';
    this.results = [];
    this.open = false;
  }

  categoryLabel(p: Place): string {
    return CATEGORY_LABELS[p.category];
  }

  regionLabel(p: Place): string {
    return REGION_LABELS[p.region];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
