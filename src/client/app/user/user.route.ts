import { RouterModule, Routes } from '@angular/router';

// services
//import { AuthGuardService } from '../_services/auth-guard.service';
import { AntiAuthGuardService } from '../_services/anti-auth-guard.service';

// components
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

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
    canActivate: [AntiAuthGuardService],
    component: LoginComponent
  },
  {
    path: 'signup',
    canActivate: [AntiAuthGuardService],
    component: SignupComponent,
  },
  {
    path: '**',
    component: Http404Component,
  }
];

export const userRoutes = RouterModule.forChild(userRouting);