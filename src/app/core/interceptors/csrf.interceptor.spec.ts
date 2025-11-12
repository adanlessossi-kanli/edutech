import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { csrfInterceptor } from './csrf.interceptor';

describe('csrfInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([csrfInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
    document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });

  it('should not add CSRF token to GET requests', () => {
    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('X-CSRF-Token')).toBe(false);
    req.flush({});
  });

  it('should add CSRF token to POST requests', () => {
    document.cookie = 'XSRF-TOKEN=test-csrf-token';

    httpClient.post('/api/test', {}).subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('X-CSRF-Token')).toBe(true);
    expect(req.request.headers.get('X-CSRF-Token')).toBe('test-csrf-token');
    req.flush({});
  });

  it('should add CSRF token to PUT requests', () => {
    document.cookie = 'XSRF-TOKEN=test-csrf-token';

    httpClient.put('/api/test', {}).subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('X-CSRF-Token')).toBe(true);
    req.flush({});
  });

  it('should add CSRF token to DELETE requests', () => {
    document.cookie = 'XSRF-TOKEN=test-csrf-token';

    httpClient.delete('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('X-CSRF-Token')).toBe(true);
    req.flush({});
  });
});
