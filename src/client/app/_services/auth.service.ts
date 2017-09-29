import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { DataService } from './data.service';

@Injectable()
export class AuthService {

  token: string;
  loginUrl: string = "/api/user/login";

  constructor(
    private dataService: DataService
  ) {
    // get current user info from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login: (form: any) => Promise<any> = (form: any) => {
    return new Promise((resolve, reject) => {

        this.dataService.postJsonData(this.loginUrl, form)
        .subscribe(
          (res)=> {
            if (res.token) {
              // set token property
              this.token = res.token;
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify({ username: res.username, token: res.token }));
            }
            // login failed because of incorrect username or password || or server internal error
            resolve(res.status); // right or wrong shares

          },
          (err) => {
            reject(err);
          }
        );


    });

  };

  logout: () => any = () => {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  };

}