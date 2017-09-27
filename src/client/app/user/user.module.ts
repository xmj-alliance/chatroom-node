import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// md modules
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';


// route
import { userRoutes } from './user.route';

// componets
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';

const mdModules = [
  MatInputModule,
  MatCardModule,
  MatButtonModule
];

@NgModule({
  imports: [
    CommonModule,

    mdModules,

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