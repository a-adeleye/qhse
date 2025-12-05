import {Routes} from '@angular/router';
import {Pages} from '@pages/pages';
import {Home} from '@pages/home/home';
import {Start} from '@pages/start/start';
import {StartMenu} from '@pages/start-menu/start-menu';
import {LogsMenu} from '@pages/logs-menu/logs-menu';
import {Logs} from '@pages/logs/logs';
import {LogDetailComponent} from '@pages/logs/log-details/log-detail';
import {AuthGuard} from '@shared/guards/auth.guard';
import {Inspection} from '@pages/inspection/inspection';

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
        component: StartMenu,
        canActivate: [AuthGuard]
      },
      {
        path: 'inspection/:list',
        component: Inspection,
        canActivate: [AuthGuard]
      },
      {
        path: 'start/vehicle-inspection',
        component: Start,
        canActivate: [AuthGuard]
      },
      {
        path: 'logs',
        component: LogsMenu,
        canActivate: [AuthGuard]
      },
      {
        path: 'logs/:list',
        component: Logs,
        canActivate: [AuthGuard]
      },
      {
        path: 'logs/:list/:id',
        component: LogDetailComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
];
