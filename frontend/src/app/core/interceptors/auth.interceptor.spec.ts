import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  function setup(token: string | null) {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: { getToken: () => token } },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  }

  afterEach(() => httpMock.verify());

  it('adds Authorization header when a token is present', () => {
    setup('my-jwt-token');
    httpClient.get('/api/places').subscribe();

    const req = httpMock.expectOne('/api/places');
    expect(req.request.headers.get('Authorization')).toBe('Bearer my-jwt-token');
    req.flush([]);
  });

  it('does not add Authorization header when no token', () => {
    setup(null);
    httpClient.get('/api/places').subscribe();

    const req = httpMock.expectOne('/api/places');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush([]);
  });

  it('passes the request through unchanged when no token', () => {
    setup(null);
    httpClient.get('/api/places', { params: { region: 'south' } }).subscribe();

    const req = httpMock.expectOne(r => r.url === '/api/places');
    expect(req.request.params.get('region')).toBe('south');
    req.flush([]);
  });
});
