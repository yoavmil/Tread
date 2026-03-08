import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Place, PlaceMarker, PlaceCategory, PlaceRegion } from '../../models/place.model';

@Injectable({ providedIn: 'root' })
export class PlacesService {
  private placeCache = new Map<string, Place>();

  constructor(private http: HttpClient) {}

  getAll(filters?: { category?: PlaceCategory; region?: PlaceRegion }): Observable<PlaceMarker[]> {
    let url = '/api/places';
    const params: string[] = [];
    if (filters?.category) params.push(`category=${filters.category}`);
    if (filters?.region) params.push(`region=${filters.region}`);
    if (params.length) url += '?' + params.join('&');
    return this.http.get<PlaceMarker[]>(url);
  }

  getById(id: string): Observable<Place> {
    const cached = this.placeCache.get(id);
    if (cached) return of(cached);
    return this.http.get<Place>(`/api/places/${id}`).pipe(
      tap(place => this.placeCache.set(id, place))
    );
  }

  evictCache(id: string): void {
    this.placeCache.delete(id);
  }

  search(q: string): Observable<Place[]> {
    return this.http.get<Place[]>(`/api/places/search?q=${encodeURIComponent(q)}`);
  }
}
