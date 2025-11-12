import { ErrorHandler, Injectable, inject } from '@angular/core';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private loggingService = inject(LoggingService);

  handleError(error: Error): void {
    const errorMessage = error.message || 'An unexpected error occurred';
    const stackTrace = error.stack || '';

    this.loggingService.error('Global Error', {
      message: errorMessage,
      stack: stackTrace,
      timestamp: new Date().toISOString()
    });

    console.error('Global error:', error);
  }
}
