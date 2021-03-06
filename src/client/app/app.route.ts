import { RouterModule, Routes } from '@angular/router';

// services
import { AuthGuardService } from './_services/auth-guard.service';

// components
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';

const appRouting: Routes = [
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
    path: 'chat',
    loadChildren: './chatroom/chatroom.module#ChatroomModule'
    //canLoad: [AuthGuardService]
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: '**',
    component: Http404Component
  }
];

export const appRoutes = RouterModule.forRoot(appRouting, { useHash: true });