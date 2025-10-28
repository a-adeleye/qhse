import {Inject, Injectable, InjectionToken, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {StorageKeysEnum} from '@shared/enums/storage-keys.enum';
import CryptoJS from "crypto-js";
import {environment} from '@env';

@Injectable({providedIn: 'root'})
export class LocalStorageRefService {
  constructor(@Inject(PLATFORM_ID) private platformId: InjectionToken<object>) {
  }

  get localStorage() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage;
    }
    return null;
  }

  setData(key: StorageKeysEnum, data: unknown) {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), environment.cypherKey).toString();
    this.localStorage?.setItem(key, ciphertext);
  }

  getData(key: StorageKeysEnum): unknown {
    const ciphertext = this.localStorage?.getItem(key);
    if (!ciphertext) return null;
    const bytes = CryptoJS.AES.decrypt(ciphertext, environment.cypherKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  removeData(key: string) {
    this.localStorage?.removeItem(key);
  }

}
