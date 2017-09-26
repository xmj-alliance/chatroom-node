import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// md mods
import { MatToolbarModule } from '@angular/material';
import { MatCardModule } from '@angular/material';

// routes
import { chatroomRoutes } from './chatroom.route';

// componets
import { ChatroomComponent } from './chatroom.component';

const mdModules = [
  MatToolbarModule,
  MatCardModule
];

@NgModule({
  imports: [
    CommonModule,
    mdModules,

    chatroomRoutes
  ],
  declarations: [
    ChatroomComponent
  ]
})
export class ChatroomModule { }