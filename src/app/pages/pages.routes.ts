import { Routes } from '@angular/router';
import { Pages } from '@pages/pages';
import { Home } from '@pages/home/home';
import { Start } from '@pages/start/start';
import { StartMenu } from '@pages/start-menu/start-menu';
import { LogsMenu } from '@pages/logs-menu/logs-menu';
import { LogsComponent } from '@pages/logs/logs';
import { LogDetailComponent } from '@pages/logs/log-details/log-detail';
import { AuthGuard } from '@shared/guards/auth.guard';

export const pageRoutes: Routes = [
  {
    path: '',
    component: Pages,
    children: [
      {
        path: '',
        component: Home,
        data: { animation: 'Home' }
      },
      {
        path: 'start',
        component: StartMenu,
        data: { animation: 'StartMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'start/vehicle-inspection',
        component: Start,
        data: { animation: 'Start' },
        canActivate: [AuthGuard]
      },
      {
        path: 'logs',
        component: LogsMenu,
        data: { animation: 'LogsMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'logs/vehicle-inspection',
        component: LogsComponent,
        data: { animation: 'Logs' },
        canActivate: [AuthGuard]
      },
      {
        path: 'logs/vehicle-inspection/:id',
        component: LogDetailComponent,
        data: { animation: 'LogDetail' },
        canActivate: [AuthGuard]
      },
    ]
  },
];
