import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
    spyOn(console, 'debug');
    spyOn(console, 'info');
    spyOn(console, 'warn');
    spyOn(console, 'error');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log debug messages', () => {
    service.debug('Test debug', { data: 'test' });
    expect(console.debug).toHaveBeenCalled();
  });

  it('should log info messages', () => {
    service.info('Test info');
    expect(console.info).toHaveBeenCalled();
  });

  it('should log warn messages', () => {
    service.warn('Test warning');
    expect(console.warn).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    service.error('Test error', { error: 'details' });
    expect(console.error).toHaveBeenCalled();
  });
});
