import { RouterModule, Routes } from '@angular/router';

// components
import { ChatroomComponent } from './chatroom.component';

const chatroomRouting = [
  {
    path: 'index',
    redirectTo: '',
  },
  {
    path: '',
    pathMatch: 'full',
    component: ChatroomComponent
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

export const chatroomRoutes = RouterModule.forChild(chatroomRouting);