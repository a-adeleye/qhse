import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {SyncBanner} from '@pages/sync-banner/sync-banner';

@Component({
  selector: 'app-home',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {



  showBanner(){
    return
  }
}
