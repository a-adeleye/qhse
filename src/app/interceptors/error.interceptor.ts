import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '@shared/services/auth/auth.service';
import {HttpErrorModel} from '@shared/models/http-error.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  httpErrorModel!: HttpErrorModel;

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error) => {
      return this.handleResponseError(error, request);
    }));
  }

  handleResponseError(error: unknown, request: HttpRequest<unknown>) {
    if (request.url.includes('/auth/logout')) {
      return throwError(() => error);
    }

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401:
          this.authService.logout();
          return throwError(() => error.message);
        case 403:
          this.httpErrorModel = this.getErrorResponse(error);
          break;
        default:
          this.httpErrorModel = this.getErrorResponse(error);
          break;
      }
      return throwError(() => this.httpErrorModel);
    } else {
      this.httpErrorModel = this.getErrorResponse(error as HttpErrorResponse);
      return throwError(() => this.httpErrorModel);
    }
  }

  getErrorResponse(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    const errorObj = errorResponse.error;
    const errorData = errorObj.error;
    const errorMessage = errorData.message;
    return new HttpErrorModel(errorMessage.value, errorResponse.status);
  }

}
