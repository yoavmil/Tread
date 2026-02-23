import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { SuggestService } from './suggest.service';
import { Place } from '../../models/place.model';

const MOCK_PLACE: Place = {
  _id: 'p1',
  name: 'עין גדי',
  aliases: [],
  category: 'nature',
  description: '',
  coordinates: { lat: 31.46, lng: 35.38 },
  region: 'south',
  difficulty: null,
  images: [],
  externalUrl: '',
  visitorsCount: 0,
};

describe('SuggestService', () => {
  let service: SuggestService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuggestService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SuggestService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('submitEdit()', () => {
    it('POSTs before and after to /api/suggest-edit', () => {
      const after = { description: 'Updated description' };
      service.submitEdit(MOCK_PLACE, after).subscribe();

      const req = http.expectOne('/api/suggest-edit');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ before: MOCK_PLACE, after });
      req.flush({ ok: true });
    });

    it('returns { ok: true } on success', () => {
      let result: { ok: boolean } | undefined;
      service.submitEdit(MOCK_PLACE, {}).subscribe(r => (result = r));
      http.expectOne('/api/suggest-edit').flush({ ok: true });
      expect(result).toEqual({ ok: true });
    });
  });

  describe('submitNew()', () => {
    it('POSTs the place to /api/suggest-new', () => {
      const newPlace = { name: 'מקום חדש', category: 'nature' };
      service.submitNew(newPlace).subscribe();

      const req = http.expectOne('/api/suggest-new');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ place: newPlace });
      req.flush({ ok: true });
    });

    it('returns { ok: true } on success', () => {
      let result: { ok: boolean } | undefined;
      service.submitNew({ name: 'x' }).subscribe(r => (result = r));
      http.expectOne('/api/suggest-new').flush({ ok: true });
      expect(result).toEqual({ ok: true });
    });
  });
});
