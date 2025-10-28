import {Injectable} from '@angular/core';
import {LocalStorageRefService} from '@shared/services/local-storage-ref.service';
import {TokenModel} from '@shared/models/user/token.model';
import {StorageKeysEnum} from '@shared/enums/storage-keys.enum';
import {Router} from '@angular/router';
import {MsalService} from '@azure/msal-angular';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {environment} from '@env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $loginState = new BehaviorSubject<boolean>(false);
  private readonly scopes = ['https://jetexfs.sharepoint.com/.default'];

  constructor(
    private http: HttpClient,
    private msalService: MsalService,
    private localStorageRefService: LocalStorageRefService,
    private router: Router) {
    this.updateLoginState();
  }

  public get currentUser() {
    return this.loadFromStorage();
  }

  get loginState() {
    return this.$loginState.asObservable();
  }

  isLoggedIn() {
    return this.loadFromStorage() !== null;
  }

  logout(route = '/login') {
    this.localStorageRefService.removeData(StorageKeysEnum.USER);
    this.updateLoginState();
    this.router.navigate([route]).then();
  }

  login() {
    this.msalService.loginPopup({
      scopes: this.scopes
    }).subscribe(response => {
      this.msalService.instance.setActiveAccount(response.account);
      sessionStorage.removeItem(StorageKeysEnum.LOGGING_IN);

      this.getEmployeeId(response.account.username).subscribe(async (Id) => {
        const updatedUser = {...response.account, Id};
        this.localStorageRefService.setData(StorageKeysEnum.USER, updatedUser);
        this.updateLoginState();
      });
    });
  }

  private loadFromStorage() {
    return this.localStorageRefService.getData(StorageKeysEnum.USER) as TokenModel;
  }

  private updateLoginState() {
    this.$loginState.next(!!this.loadFromStorage());
  }

  private getEmployeeId(email: string): Observable<number> {
    const logonName = `i:0#.f|membership|${email}`;
    const url = `${environment.siteUrl}/ensureuser`;

    return this.http.post<any>(url, {logonName}, {
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
      }
    }).pipe(map(response => response.d.Id));
  }

}
