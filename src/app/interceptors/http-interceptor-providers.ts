import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '@shared/interceptors/token.interceptor';
import {ErrorInterceptor} from '@shared/interceptors/error.interceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
];
