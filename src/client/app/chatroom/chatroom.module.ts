import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// md mods
import { MatToolbarModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

// routes
import { chatroomRoutes } from './chatroom.route';

// componets
import { ChatroomComponent } from './chatroom.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { WithComponent } from './with/with.component';

const mdModules = [
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule
];

@NgModule({
  imports: [
    CommonModule,
    mdModules,

    chatroomRoutes
  ],
  declarations: [
    ChatroomComponent,
    IndexComponent,
    Http404Component,
    WithComponent
  ]
})
export class ChatroomModule { }