import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '@shared/services/auth/auth.service';
import {environment} from '@env';

enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private lastErrors: { [key: string]: number } = {};
  private readonly ERROR_TIMEOUT = 60000;
  private readonly MAX_LOGS = 1000;

  constructor(
    private zone: NgZone,
    private authService: AuthService
  ) {
  }


  handleError(error: any): void {
    if (!environment.production) {
      console.error('Development mode error:', error);
      return;
    }

    try {
      const {message, stack} = error instanceof Error
        ? error
        : {message: (error || '').toString(), stack: null};

      const errorKey = message.substring(0, 100);
      const now = Date.now();

      if (this.lastErrors[errorKey] && (now - this.lastErrors[errorKey] < this.ERROR_TIMEOUT)) {
        return;
      }

      this.lastErrors[errorKey] = now;

      const severity = this.determineSeverity(error);

      const payload = {
        message,
        stack,
        severity,
        url: window.location.href,
        route: this.getCurrentRoute(),
        user: this.authService.currentUser?.username ?? 'unknown',
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        ts: Date.now()
      };

      this.zone.runOutsideAngular(() => {
//store error
      });
    } catch (handlerError) {
      console.error('Error in GlobalErrorHandler:', handlerError);
    }
  }

  private determineSeverity(error: any): ErrorSeverity {
    if (error instanceof HttpErrorResponse) {
      if (error.status >= 500) return ErrorSeverity.HIGH;
      if (error.status >= 400) return ErrorSeverity.MEDIUM;
      return ErrorSeverity.LOW;
    }

    if (error && error.message) {
      const msg = error.message.toLowerCase();

      if (
        msg.includes('memory') ||
        msg.includes('storage') ||
        msg.includes('quota') ||
        msg.includes('crash') ||
        msg.includes('fatal')
      ) {
        return ErrorSeverity.CRITICAL;
      }

      if (
        msg.includes('security') ||
        msg.includes('permission') ||
        msg.includes('access') ||
        msg.includes('unauthorized')
      ) {
        return ErrorSeverity.HIGH;
      }
    }

    return ErrorSeverity.MEDIUM;
  }


  private getCurrentRoute(): string {
    try {
      const path = window.location.pathname;
      const query = window.location.search;
      return path + query;
    } catch {
      return '';
    }
  }
}
