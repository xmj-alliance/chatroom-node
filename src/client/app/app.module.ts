import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// routes
import { appRoutes } from "./app.route";

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';

const angularModules = [
  BrowserModule,
  BrowserAnimationsModule,
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
  bootstrap: [ AppComponent ]
})
export class AppModule { }