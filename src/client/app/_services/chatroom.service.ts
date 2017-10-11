import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable()
export class ChatroomService {

  constructor(
    private dataService: DataService
  ) { }

  baseFileAPI = "/api/file/";
  avatarAPI = `${this.baseFileAPI}/images/avatars/`

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

}
