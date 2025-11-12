import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiPrefixInterceptor } from './api-prefix.interceptor';
import { HttpClient } from '@angular/common/http';

describe('apiPrefixInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiPrefixInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend API URL to requests starting with /api', () => {
    httpClient.get('/api/workshops').subscribe();

    const req = httpMock.expectOne((request) => request.url.includes('/api/workshops'));
    expect(req.request.url).toContain('http');
    req.flush({});
  });

  it('should not modify requests not starting with /api', () => {
    httpClient.get('https://external.com/data').subscribe();

    const req = httpMock.expectOne('https://external.com/data');
    expect(req.request.url).toBe('https://external.com/data');
    req.flush({});
  });
});
