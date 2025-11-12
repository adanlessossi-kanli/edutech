import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HttpClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET request', () => {
    service.get<any>('/api/test').subscribe((data) => {
      expect(data).toEqual({ success: true });
    });

    const req = httpMock.expectOne('/api/test');
    expect(req.request.method).toBe('GET');
    req.flush({ success: true });
  });

  it('should make POST request', () => {
    const body = { name: 'test' };
    service.post<any>('/api/test', body).subscribe((data) => {
      expect(data).toEqual({ success: true });
    });

    const req = httpMock.expectOne('/api/test');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush({ success: true });
  });

  it('should make PUT request', () => {
    const body = { name: 'test' };
    service.put<any>('/api/test', body).subscribe((data) => {
      expect(data).toEqual({ success: true });
    });

    const req = httpMock.expectOne('/api/test');
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true });
  });

  it('should make PATCH request', () => {
    const body = { name: 'test' };
    service.patch<any>('/api/test', body).subscribe((data) => {
      expect(data).toEqual({ success: true });
    });

    const req = httpMock.expectOne('/api/test');
    expect(req.request.method).toBe('PATCH');
    req.flush({ success: true });
  });

  it('should make DELETE request', () => {
    service.delete<any>('/api/test').subscribe((data) => {
      expect(data).toEqual({ success: true });
    });

    const req = httpMock.expectOne('/api/test');
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});
