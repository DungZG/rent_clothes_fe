import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

// TODO: Inject a LoadingService when implemented
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip loading indicator for background requests
  if (req.headers.has('X-Skip-Loading')) {
    return next(req);
  }

  return next(req).pipe(
    finalize(() => {
      // Hide loading indicator
    })
  );
};
