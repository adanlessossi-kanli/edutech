import { HttpInterceptorFn } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(timeout(environment.apiTimeout));
};
