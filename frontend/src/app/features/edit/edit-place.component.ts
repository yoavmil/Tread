import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Place, PlaceCategory, PlaceRegion, TrailDifficulty, CATEGORY_LABELS, REGION_LABELS } from '../../models/place.model';
import { PlacesService } from '../../core/services/places.service';
import { SuggestService } from '../../core/services/suggest.service';

@Component({
  selector: 'app-edit-place',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="edit-page">
      <div class="edit-card" *ngIf="place; else loading">

        <div class="edit-header">
          <button mat-icon-button class="back-btn" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h1>הצעת עריכה</h1>
        </div>

        <p class="subtitle">
          עורך את: <strong>{{ place.name }}</strong><br>
          השינויים יישלחו לבדיקה לפני שיפורסמו.
        </p>

        <form [formGroup]="form" (ngSubmit)="submit()">

          <mat-form-field appearance="outline">
            <mat-label>שם</mat-label>
            <input matInput formControlName="name" dir="rtl">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>שמות נוספים (מופרדים בפסיקים)</mat-label>
            <input matInput formControlName="aliases" dir="rtl"
              placeholder="שם אחר, שם נוסף">
            <mat-hint>הפרד בין שמות עם פסיק</mat-hint>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>קישור חיצוני</mat-label>
            <input matInput formControlName="externalUrl" dir="ltr"
              placeholder="https://...">
          </mat-form-field>

          <div class="row">
            <mat-form-field appearance="outline">
              <mat-label>קטגוריה</mat-label>
              <mat-select formControlName="category">
                @for (cat of categories; track cat.value) {
                  <mat-option [value]="cat.value">{{ cat.label }}</mat-option>
                }
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>אזור</mat-label>
              <mat-select formControlName="region">
                @for (r of regions; track r.value) {
                  <mat-option [value]="r.value">{{ r.label }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>רמת קושי</mat-label>
            <mat-select formControlName="difficulty">
              <mat-option [value]="null">—</mat-option>
              <mat-option value="easy">קל</mat-option>
              <mat-option value="moderate">בינוני</mat-option>
              <mat-option value="hard">קשה</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>תיאור</mat-label>
            <textarea matInput formControlName="description" dir="rtl" rows="4"></textarea>
          </mat-form-field>

          <div class="coords-section">
            <label class="coords-label">קואורדינטות</label>
            <div class="coords-row">
              <mat-form-field appearance="outline" class="coord-field">
                <mat-label>קו רוחב (lat)</mat-label>
                <input matInput type="number" formControlName="lat" step="0.0001">
              </mat-form-field>
              <mat-form-field appearance="outline" class="coord-field">
                <mat-label>קו אורך (lng)</mat-label>
                <input matInput type="number" formControlName="lng" step="0.0001">
              </mat-form-field>
              <button mat-stroked-button type="button" class="gps-btn"
                (click)="useMyLocation()" [disabled]="gettingLocation">
                @if (gettingLocation) {
                  <mat-spinner diameter="18"></mat-spinner>
                } @else {
                  <mat-icon>my_location</mat-icon>
                  מיקום נוכחי
                }
              </button>
            </div>
          </div>

          <div class="actions">
            <button mat-button type="button" (click)="goBack()">ביטול</button>
            <button mat-flat-button color="primary" type="submit"
              [disabled]="form.invalid || submitting">
              @if (submitting) {
                <mat-spinner diameter="20"></mat-spinner>
              } @else {
                <mat-icon>send</mat-icon>
                שלח הצעה
              }
            </button>
          </div>

        </form>
      </div>

      <ng-template #loading>
        <div class="loading-state">
          @if (loadError) {
            <p>שגיאה בטעינת המקום.</p>
            <button mat-button (click)="goBack()">חזרה</button>
          } @else {
            <mat-spinner></mat-spinner>
          }
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #f5f5f5;
    }

    .edit-page {
      max-width: 600px;
      margin: 0 auto;
      padding: 24px 16px 48px;
    }

    .edit-card {
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.08);
    }

    .edit-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    h1 {
      font-size: 22px;
      font-weight: 700;
      margin: 0;
    }

    .back-btn { color: #555; }

    .subtitle {
      font-size: 14px;
      color: #666;
      margin: 0 0 24px;
      line-height: 1.6;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    mat-form-field {
      width: 100%;
    }

    .row {
      display: flex;
      gap: 12px;

      mat-form-field { flex: 1; }
    }

    .coords-section {
      margin: 4px 0;
    }

    .coords-label {
      display: block;
      font-size: 12px;
      color: #666;
      margin-bottom: 6px;
    }

    .coords-row {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .coord-field {
      flex: 1;
      min-width: 120px;
    }

    .gps-btn {
      height: 56px;
      gap: 6px;
      white-space: nowrap;
      flex-shrink: 0;

      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 8px;

      button[mat-flat-button] {
        gap: 6px;
        mat-icon { font-size: 18px; width: 18px; height: 18px; }
      }
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 40vh;
      gap: 16px;
    }
  `]
})
export class EditPlaceComponent implements OnInit {
  place: Place | null = null;
  loadError = false;
  form!: FormGroup;
  submitting = false;
  gettingLocation = false;

  categories = (Object.entries(CATEGORY_LABELS) as [PlaceCategory, string][])
    .map(([value, label]) => ({ value, label }));

  regions = (Object.entries(REGION_LABELS) as [PlaceRegion, string][])
    .map(([value, label]) => ({ value, label }));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private places: PlacesService,
    private suggest: SuggestService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('placeId');
    if (!id) { this.goBack(); return; }

    this.places.getById(id).subscribe({
      next: (place) => {
        this.place = place;
        this.buildForm(place);
      },
      error: () => { this.loadError = true; }
    });
  }

  private buildForm(p: Place): void {
    this.form = this.fb.group({
      name:        [p.name, Validators.required],
      aliases:     [p.aliases?.join(', ') ?? ''],
      externalUrl: [p.externalUrl ?? ''],
      category:    [p.category, Validators.required],
      region:      [p.region, Validators.required],
      difficulty:  [p.difficulty ?? null],
      description: [p.description ?? ''],
      lat:         [p.coordinates?.lat, Validators.required],
      lng:         [p.coordinates?.lng, Validators.required],
    });
  }

  useMyLocation(): void {
    if (!navigator.geolocation) return;
    this.gettingLocation = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.form.patchValue({
          lat: parseFloat(pos.coords.latitude.toFixed(6)),
          lng: parseFloat(pos.coords.longitude.toFixed(6)),
        });
        this.gettingLocation = false;
      },
      () => { this.gettingLocation = false; }
    );
  }

  submit(): void {
    if (!this.place || this.form.invalid) return;
    this.submitting = true;

    const v = this.form.value;
    const after: Partial<Place> = {
      name:        v.name.trim(),
      aliases:     v.aliases ? v.aliases.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      externalUrl: v.externalUrl?.trim() ?? '',
      category:    v.category,
      region:      v.region,
      difficulty:  v.difficulty as TrailDifficulty,
      description: v.description?.trim() ?? '',
      coordinates: { lat: v.lat, lng: v.lng },
    };

    this.suggest.submitEdit(this.place, after).subscribe({
      next: () => {
        this.submitting = false;
        this.snackBar.open('תודה! ההצעה נשלחה לבדיקה.', 'סגור', { duration: 4000 });
        this.goBack();
      },
      error: () => {
        this.submitting = false;
        this.snackBar.open('שגיאה בשליחה. נסה שוב.', 'סגור', { duration: 4000 });
      }
    });
  }

  goBack(): void {
    if (this.place) {
      this.router.navigate(['/map', this.place._id]);
    } else {
      this.router.navigate(['/map']);
    }
  }
}
