import { RouterModule, Routes } from '@angular/router';

// components
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { LoginComponent } from './login/login.component';

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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: Http404Component,
  }
];

export const userRoutes = RouterModule.forChild(userRouting);