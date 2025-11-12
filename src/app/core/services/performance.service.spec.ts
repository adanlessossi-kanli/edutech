import { TestBed } from '@angular/core/testing';
import { PerformanceService } from './performance.service';
import { LoggingService } from './logging.service';

describe('PerformanceService', () => {
  let service: PerformanceService;
  let loggingService: jasmine.SpyObj<LoggingService>;

  beforeEach(() => {
    const loggingSpy = jasmine.createSpyObj('LoggingService', ['info']);

    TestBed.configureTestingModule({
      providers: [
        PerformanceService,
        { provide: LoggingService, useValue: loggingSpy }
      ]
    });

    service = TestBed.inject(PerformanceService);
    loggingService = TestBed.inject(LoggingService) as jasmine.SpyObj<LoggingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should measure web vitals', () => {
    service.measureWebVitals();
    expect(service).toBeTruthy();
  });
});
