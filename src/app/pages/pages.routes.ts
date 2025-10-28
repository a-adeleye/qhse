import {Routes} from '@angular/router';
import {Pages} from '@pages/pages';
import {Home} from '@pages/home/home';

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
    ]
  },
];
