import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketIOService {

  socket = io.connect();

  sockets: any[] = [
    // {
    //   room: "public",
    //   socket: (SocketIOClient.Socket)
    // }
  ];

  joinroom = (roomname: string) => {
    this.socket.emit('joinroom', roomname);
    this.sockets.push(
      {
        room: roomname,
        socket: this.socket
      }
    )
  };
  
  constructor(
    
  ) { }

}
