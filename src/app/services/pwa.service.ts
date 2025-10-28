import {inject, Injectable} from '@angular/core';
import {SwUpdate, VersionReadyEvent} from '@angular/service-worker';
import {concatMap, filter,} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class PwaUpdateService {

  snackBar = inject(MatSnackBar);

  constructor(private swUpdate: SwUpdate) {
  }

  checkAndUpdate() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      concatMap(() => this.swUpdate.activateUpdate())
    ).subscribe(() => {
      this.snackBar.open('New app version available, will reload', '', {panelClass: 'bg-glass', duration: 2000});
      localStorage.clear();
      document.location.reload();
    });
  }
}
