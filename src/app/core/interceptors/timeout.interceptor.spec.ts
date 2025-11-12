import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { timeoutInterceptor } from './timeout.interceptor';
import { HttpClient } from '@angular/common/http';

describe('timeoutInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([timeoutInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should allow requests that complete within timeout', (done) => {
    httpClient.get('/api/test').subscribe({
      next: (data) => {
        expect(data).toEqual({ success: true });
        done();
      },
    });

    const req = httpMock.expectOne('/api/test');
    req.flush({ success: true });
  });
});
