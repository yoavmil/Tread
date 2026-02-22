import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PlacesService } from './places.service';

describe('PlacesService', () => {
  let service: PlacesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlacesService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PlacesService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('getAll()', () => {
    it('calls /api/places with no params when no filter', () => {
      service.getAll().subscribe();
      http.expectOne('/api/places').flush([]);
    });

    it('appends category param', () => {
      service.getAll({ category: 'nature' }).subscribe();
      http.expectOne('/api/places?category=nature').flush([]);
    });

    it('appends region param', () => {
      service.getAll({ region: 'south' }).subscribe();
      http.expectOne('/api/places?region=south').flush([]);
    });

    it('appends both params when both are provided', () => {
      service.getAll({ category: 'historical', region: 'north' }).subscribe();
      http.expectOne('/api/places?category=historical&region=north').flush([]);
    });
  });

  describe('getById()', () => {
    it('calls /api/places/:id', () => {
      service.getById('abc123').subscribe();
      http.expectOne('/api/places/abc123').flush({});
    });
  });

  describe('search()', () => {
    it('calls /api/places/search with an encoded q param', () => {
      service.search('עין גדי').subscribe();
      const encoded = encodeURIComponent('עין גדי');
      http.expectOne(`/api/places/search?q=${encoded}`).flush([]);
    });

    it('calls /api/places/search with a plain ASCII query', () => {
      service.search('masada').subscribe();
      http.expectOne('/api/places/search?q=masada').flush([]);
    });
  });
});
