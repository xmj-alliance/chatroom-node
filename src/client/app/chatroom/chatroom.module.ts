import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// md mods
import { MatToolbarModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

// routes
import { chatroomRoutes } from './chatroom.route';

// directives
import { Img0Directive } from '../_directive/img0.directive';

// componets
import { ChatroomComponent } from './chatroom.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { WithComponent } from './with/with.component';

const angularModules = [
  CommonModule,
  FormsModule
];

const mdModules = [
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule
];

@NgModule({
  imports: [
    angularModules,
    mdModules,
    chatroomRoutes
  ],
  declarations: [
    Img0Directive,

    ChatroomComponent,
    IndexComponent,
    Http404Component,
    WithComponent
  ]
})
export class ChatroomModule { }