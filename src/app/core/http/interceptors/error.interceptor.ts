import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Đã xảy ra lỗi không xác định';

      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        switch (error.status) {
          case 401: errorMessage = 'Phiên đăng nhập đã hết hạn'; break;
          case 403: errorMessage = 'Bạn không có quyền truy cập'; break;
          case 404: errorMessage = 'Không tìm thấy tài nguyên'; break;
          case 500: errorMessage = 'Lỗi hệ thống, vui lòng thử lại sau'; break;
        }
      }
      console.error('HTTP Error:', errorMessage, error);
      return throwError(() => error);
    })
  );
};
