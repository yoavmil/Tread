import { Injectable, signal } from '@angular/core';
import { PlaceCategory, CATEGORY_LABELS, FilterState } from '../../models/place.model';

@Injectable({ providedIn: 'root' })
export class FilterStateService {
  readonly state = signal<FilterState>({
    categories: Object.keys(CATEGORY_LABELS) as PlaceCategory[],
    region: null,
    showVisited: true,
  });

  set(fs: FilterState): void {
    this.state.set(fs);
  }
}
