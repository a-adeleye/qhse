import {Component} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {ChildrenOutletContexts, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {filter} from 'rxjs';
import {fadeAnimation} from '@shared/directives/animations';
import {AuthService} from '@shared/services/auth/auth.service';
import {ScrollShadowDirective} from '@shared/directives/header-shadow.directive';


@Component({
  selector: 'app-layout',
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
  animations: [
    fadeAnimation
  ]
})
export class Pages {
  isLoggedIn = false;
  protected readonly filter = filter;

  constructor(private contexts: ChildrenOutletContexts,
              private authService: AuthService,
  ) {
    this.authService.loginState.subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  logOut() {
    this.authService.logout('/');
  }

  logIn() {
    this.authService.login();
  }
}
