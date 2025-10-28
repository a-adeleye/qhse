import {Component} from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';
import {Loading} from '@shared/components/loading/loading.component';
import {StorageKeysEnum} from '@shared/enums/storage-keys.enum';

@Component({
  selector: 'app-auth',
  imports: [
    Loading,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {
  loggingIn = false;

  constructor(private authService: AuthService) {
    this.loggingIn = !!sessionStorage.getItem(StorageKeysEnum.LOGGING_IN);
  }

  login() {
    sessionStorage.setItem(StorageKeysEnum.LOGGING_IN, 'true');
    this.loggingIn = true;
    this.authService.login();
  }
}
