// fleet-number.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { SharePointService } from '@shared/services/sharepoint/sharepoint.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FleetNumberService {
  private sharepointService = inject(SharePointService);

  private hardcodedFleetNumbers = [
    '99472', '25411', '75472', '63467', '152600',
    '28920', '47315', '38630', '38447', '49722', '49723'
  ];

  private readonly LOCAL_STORAGE_KEY = 'vehicleFleetNumbers';

  constructor() {
    if (!localStorage.getItem(this.LOCAL_STORAGE_KEY)) {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.hardcodedFleetNumbers));
    }
  }

  getFleetNumbers(): Observable<string[]> {
    if (this.isOnline()) {
      return this.sharepointService.getListItems('Vehicle Fleet Number').pipe(
        tap((data: any) => {
          if (data?.length > 0) {
            const numbers = data.map((item: any) =>
              item.FleetNumber || item.VehicleFleetNumber || item.Title || item.Number
            ).filter((num: any) => num?.toString().trim());

            if (numbers.length > 0) {
              this.saveToLocalStorage(numbers);
            }
          }
        }),
        catchError(() => {
          return of(this.getFromLocalStorage());
        })
      );
    }

    // Offline - return from local storage
    return of(this.getFromLocalStorage());
  }

  private isOnline(): boolean {
    return navigator.onLine;
  }

  private getFromLocalStorage(): string[] {
    const stored = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : this.hardcodedFleetNumbers;
  }

  private saveToLocalStorage(numbers: string[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(numbers));
  }
}
