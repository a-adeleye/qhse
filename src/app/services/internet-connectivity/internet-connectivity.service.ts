// connectivity.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternetConnectivityService {

  async checkInternetConnection(): Promise<boolean> {
    // Try multiple methods to ensure accurate connectivity check

    // Method 1: Navigator online status (quickest but least reliable)
    if (navigator.onLine === false) {
      return false;
    }

    try {
      // Method 2: Try to fetch from multiple reliable sources
      const urls = [
        'https://www.google.com/favicon.ico?t=' + Date.now(),
        'https://www.cloudflare.com/favicon.ico?t=' + Date.now()
      ];

      const promises = urls.map(url =>
        fetch(url, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache'
        }).then(() => true).catch(() => false)
      );

      // If any of the requests succeed, we're online
      const results = await Promise.all(promises);
      return results.some(result => result === true);

    } catch (error) {
      console.log('All connectivity checks failed:', error);
      return false;
    }
  }

  // Optional: Listen for connectivity changes
  onConnectionChange(callback: (isOnline: boolean) => void) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
  }
}
