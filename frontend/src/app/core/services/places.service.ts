import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place, PlaceCategory, PlaceRegion } from '../../models/place.model';

@Injectable({ providedIn: 'root' })
export class PlacesService {
  constructor(private http: HttpClient) {}

  getAll(filters?: { category?: PlaceCategory; region?: PlaceRegion }): Observable<Place[]> {
    let url = '/api/places';
    const params: string[] = [];
    if (filters?.category) params.push(`category=${filters.category}`);
    if (filters?.region) params.push(`region=${filters.region}`);
    if (params.length) url += '?' + params.join('&');
    return this.http.get<Place[]>(url);
  }

  getById(id: string): Observable<Place> {
    return this.http.get<Place>(`/api/places/${id}`);
  }

  search(q: string): Observable<Place[]> {
    return this.http.get<Place[]>(`/api/places/search?q=${encodeURIComponent(q)}`);
  }
}
