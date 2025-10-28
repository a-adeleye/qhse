import {Routes} from '@angular/router';
import {Pages} from '@pages/pages';
import {Home} from '@pages/home/home';
import {Start} from '@pages/start/start';
import {LogsComponent} from '@pages/logs/logs';
import {LogDetailComponent} from '@pages/logs/log-details/log-detail';
import {AuthGuard} from '@shared/guards/auth.guard';

export const pageRoutes: Routes = [
  {
    path: '',
    component: Pages,
    children: [
      {
        path: '',
        component: Home,
        data: {animation: 'Home'}
      },
      {
        path: 'start',
        component: Start,
        data: {animation: 'Start'},
        canActivate: [AuthGuard]
      },
      {
        path: 'logs',
        component: LogsComponent,
        data: {animation: 'Logs'},
        canActivate: [AuthGuard]
      },
      {
        path: 'logs/:id',
        component: LogDetailComponent,
        data: {animation: 'LogDetail'},
        canActivate: [AuthGuard]
      },
    ]
  },
];
