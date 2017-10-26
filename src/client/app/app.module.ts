import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// sub modules
import { AuthModule } from './_utils/auth.module';

// routes
import { appRoutes } from "./app.route";

// services
import { DataService } from './_services/data.service';
import { AuthService } from './_services/auth.service';
import { AuthGuardService } from './_services/auth-guard.service';
import { AntiAuthGuardService } from './_services/anti-auth-guard.service';
import { ChatroomService } from './_services/chatroom.service';

// components
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';



const angularModules = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpModule,
  FormsModule
];

const subModules = [
  AuthModule
];

@NgModule({
  imports: [
    angularModules,
    
    subModules,
    appRoutes
  ],
  declarations: [

    AppComponent,
    IndexComponent,
    Http404Component
  ],
  providers: [
    DataService,
    AuthService,
    AuthGuardService,
    AntiAuthGuardService,
    ChatroomService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }