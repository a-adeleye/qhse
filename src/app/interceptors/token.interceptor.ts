import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, from, Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {MsalService} from '@azure/msal-angular';
import {AuthService} from "@shared/services/auth/auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private _snackBar = inject(MatSnackBar);
  private readonly scopes = ['https://jetexfs.sharepoint.com/.default'];

  constructor(private msalService: MsalService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(
      this.msalService.instance.acquireTokenSilent({
        scopes: this.scopes,
        account: this.msalService.instance.getActiveAccount()!
      })
    ).pipe(
      switchMap(tokenResponse => {
        const authReq = req.clone({
          headers: req.headers
            .set('Authorization', `Bearer ${tokenResponse.accessToken}`)
            .set('Accept', 'application/json;odata=verbose')
        });
        return next.handle(authReq);
      }),
      catchError(error => {
        if (error.errorCode === 'no_account_error') {
          this.authService.logout();
          this._snackBar.open('Login required', '', {duration: 2000});
          return EMPTY;
        }
        return throwError(() => error);
      })
    );
  }
}
