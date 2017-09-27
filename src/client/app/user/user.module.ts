import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// route
import { userRoutes } from './user.route';

// componets
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';

@NgModule({
  imports: [
    CommonModule,

    userRoutes
  ],
  declarations: [
    UserComponent,
    LoginComponent,
    IndexComponent,
    Http404Component
  ]
})
export class UserModule { }