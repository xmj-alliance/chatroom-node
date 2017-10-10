import { RouterModule, Routes } from '@angular/router';

// components
import { ChatroomComponent } from './chatroom.component';
import { IndexComponent } from './index/index.component';
import { Http404Component } from './http404/http404.component';
import { WithComponent } from './with/with.component';

const chatroomRouting: any[] = [
  {
    path: 'index',
    redirectTo: '',
  },
  {
    path: '',
    pathMatch: 'full',
    component: ChatroomComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexComponent
      },
      {
        path: 'with/:name',
        component: WithComponent
      },
      {
        path: '**',
        component: Http404Component
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

export const chatroomRoutes = RouterModule.forChild(chatroomRouting);