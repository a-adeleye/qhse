import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-home',
  imports: [
    MatSidenavModule,
    MatBadgeModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
