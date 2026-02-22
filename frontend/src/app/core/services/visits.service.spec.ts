import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { VisitsService } from './visits.service';
import { AuthService } from './auth.service';

describe('VisitsService', () => {
  let service: VisitsService;
  let http: HttpTestingController;
  let mockAuth: { markVisited: jest.Mock; unmarkVisited: jest.Mock };

  beforeEach(() => {
    mockAuth = {
      markVisited: jest.fn(),
      unmarkVisited: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        VisitsService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuth },
      ],
    });
    service = TestBed.inject(VisitsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('markVisited()', () => {
    it('POSTs to /api/users/me/visits with the placeId in the body', () => {
      service.markVisited('p1').subscribe();
      const req = http.expectOne('/api/users/me/visits');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ placeId: 'p1' });
      req.flush({ visitedPlaces: ['p1'] });
    });

    it('calls auth.markVisited() after the request succeeds', () => {
      service.markVisited('p1').subscribe();
      http.expectOne('/api/users/me/visits').flush({ visitedPlaces: ['p1'] });
      expect(mockAuth.markVisited).toHaveBeenCalledWith('p1');
    });
  });

  describe('unmarkVisited()', () => {
    it('DELETEs /api/users/me/visits/:id', () => {
      service.unmarkVisited('p1').subscribe();
      const req = http.expectOne('/api/users/me/visits/p1');
      expect(req.request.method).toBe('DELETE');
      req.flush({ visitedPlaces: [] });
    });

    it('calls auth.unmarkVisited() after the request succeeds', () => {
      service.unmarkVisited('p1').subscribe();
      http.expectOne('/api/users/me/visits/p1').flush({ visitedPlaces: [] });
      expect(mockAuth.unmarkVisited).toHaveBeenCalledWith('p1');
    });
  });
});
