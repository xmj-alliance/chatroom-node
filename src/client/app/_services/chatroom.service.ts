import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { DataService } from './data.service';

@Injectable()
export class ChatroomService {

  constructor(
    private dataService: DataService
  ) { }

  baseFileAPI = "/api/file/";
  avatarAPI = `${this.baseFileAPI}/images/avatars/`;

  // pointAvatar = (userName: string, avatarFileName: string) => {
  //   return this.dataService.getRawData(`${this.avatarAPI}/${userName}/${avatarFileName}`);
  // };

  // // quick methods
  // fetchAvatar = (userName: string, avatarFileName="main.jpg") => {
  //   return new Promise((resolve, reject) => {
  //     this.pointAvatar(userName, avatarFileName).subscribe(
  //       (resAvt) => {
  //         resolve(resAvt)
  //       }
  //     );
  //   });
  // };

  rooms = [
    {
      name: "public"
    }
  ];

  chats = [
		{
      room: "public",
			chatter: "catbon",
		  chatterDisplay: "Catbon",
			message: "meow meow meow"
		}
  ]

  oChats = Observable.of(this.chats); // observed chats object

  getChats = (roomname: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      this.oChats
      .map(chats => chats.filter((chat)=>{
        return chat.room === roomname
      }))

      // .map((chats)=>{
      //   chats.filter((chat) => {
      //     return chat.room === roomname
      //   })
      // })
      // .filter((chat) => {
      //   return chat.room === roomname;
      // })
      .subscribe(
        (next) => {
          resolve(next);
        },
        (err) => {
          reject(err);
        }
      )
    });
  };

}
