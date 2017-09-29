import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// routes
import { appRoutes } from "./app.route";

// services
import { DataService } from './_services/data.service';
import { AuthService } from './_services/auth.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';

const angularModules = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpModule,
  FormsModule
];

@NgModule({
  imports: [
    angularModules,

    appRoutes
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    Http404Component
  ],
  providers: [
    DataService,
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }