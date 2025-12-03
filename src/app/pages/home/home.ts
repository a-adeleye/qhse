import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { SyncBanner } from '@pages/sync-banner/sync-banner';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    SyncBanner,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerCards', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.8) translateY(30px)' }),
          stagger(150, [
            animate('600ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Home {
  appVersion = 'v1.2.1'

  get showBanner() {
    return this.getLocalSubmissions().length > 0;
  }

  private getLocalSubmissions(): any[] {
    const stored = localStorage.getItem('pendingChecklistSubmissions');
    return stored ? JSON.parse(stored) : [];
  }
}
