import { RouterModule, Routes } from '@angular/router';

// components
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';

const userRouting = [
  {
    path: 'index',
    redirectTo: '',
  },
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent
  },
  {
    path: '**',
    component: Http404Component,
  }
];

export const userRoutes = RouterModule.forChild(userRouting);