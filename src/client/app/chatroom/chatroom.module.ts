import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// routes
import { chatroomRoutes } from './chatroom.route';

// componets
import { ChatroomComponent } from './chatroom.component';

@NgModule({
  imports: [
    CommonModule,

    chatroomRoutes
  ],
  declarations: [
    ChatroomComponent
  ]
})
export class ChatroomModule { }