import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideServiceWorker} from '@angular/service-worker';
import {GlobalErrorHandler} from '@shared/services/error-handler';
import {httpInterceptorProviders} from '@shared/interceptors/http-interceptor-providers';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {MSAL_INSTANCE, MsalService} from '@azure/msal-angular';
import {PublicClientApplication} from '@azure/msal-browser';
import {environment} from '@env';

export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      authority: `https://login.microsoftonline.com/${environment.tenantId}`,
      redirectUri: environment.redirectUrl
    }
  });
}

export function initializeMsal(msalInstance: PublicClientApplication) {
  return async () => await msalInstance.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAnimationsAsync(),
    MsalService,
    {provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory},
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMsal,
      deps: [MSAL_INSTANCE],
      multi: true
    },
    httpInterceptorProviders,
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ]
};
