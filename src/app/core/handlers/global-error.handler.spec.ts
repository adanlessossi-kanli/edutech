import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandler } from './global-error.handler';
import { LoggingService } from '../services/logging.service';

describe('GlobalErrorHandler', () => {
  let handler: GlobalErrorHandler;
  let loggingService: jasmine.SpyObj<LoggingService>;

  beforeEach(() => {
    const loggingSpy = jasmine.createSpyObj('LoggingService', ['error']);

    TestBed.configureTestingModule({
      providers: [GlobalErrorHandler, { provide: LoggingService, useValue: loggingSpy }],
    });

    handler = TestBed.inject(GlobalErrorHandler);
    loggingService = TestBed.inject(LoggingService) as jasmine.SpyObj<LoggingService>;
  });

  it('should be created', () => {
    expect(handler).toBeTruthy();
  });

  it('should handle errors', () => {
    const error = new Error('Test error');
    handler.handleError(error);
    expect(loggingService.error).toHaveBeenCalled();
  });

  it('should log error details', () => {
    const error = new Error('Test error message');
    handler.handleError(error);
    expect(loggingService.error).toHaveBeenCalledWith(
      'Global Error',
      jasmine.objectContaining({
        message: 'Test error message',
      }),
    );
  });
});
