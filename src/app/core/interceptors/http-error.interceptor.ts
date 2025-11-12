import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import { LoggingService } from '../services/logging.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const loggingService = inject(LoggingService);

  return next(req).pipe(
    retry({
      count: 2,
      delay: (error, retryCount) => {
        if (error.status >= 500) {
          return timer(retryCount * 1000);
        }
        throw error;
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        errorMessage = `Server Error: ${error.status} - ${error.message}`;
      }

      loggingService.error('HTTP Error', {
        url: req.url,
        method: req.method,
        status: error.status,
        message: errorMessage
      });

      return throwError(() => error);
    })
  );
};
