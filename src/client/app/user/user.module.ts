import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// md modules
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

// route
import { userRoutes } from './user.route';

// directives

// componets
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
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
    FormsModule,
    ReactiveFormsModule,

    mdModules,

    userRoutes
  ],
  declarations: [

    UserComponent,
    LoginComponent,
    SignupComponent,
    IndexComponent,
    Http404Component
  ]
})
export class UserModule { }