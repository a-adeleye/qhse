import {Routes} from '@angular/router';
import {Auth} from '@pages/auth/auth';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.routes')
      .then((m) => m.pageRoutes),
  },
  {
    path: 'login',
    component: Auth,
  },
];
