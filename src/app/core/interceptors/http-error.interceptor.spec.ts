import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './http-error.interceptor';
import { LoggingService } from '../services/logging.service';

describe('httpErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loggingService: jasmine.SpyObj<LoggingService>;

  beforeEach(() => {
    const loggingSpy = jasmine.createSpyObj('LoggingService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideHttpClientTesting(),
        { provide: LoggingService, useValue: loggingSpy }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loggingService = TestBed.inject(LoggingService) as jasmine.SpyObj<LoggingService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should log HTTP errors', () => {
    httpClient.get('/api/test').subscribe({
      error: () => {}
    });

    const req = httpMock.expectOne('/api/test');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(loggingService.error).toHaveBeenCalled();
  });

  it('should handle 404 errors', () => {
    httpClient.get('/api/notfound').subscribe({
      error: () => {}
    });

    const req = httpMock.expectOne('/api/notfound');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });

    expect(loggingService.error).toHaveBeenCalled();
  });
});
