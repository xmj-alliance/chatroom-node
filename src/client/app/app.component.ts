import { Component, OnInit } from '@angular/core';

import { AuthService } from "./_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
  title = "Angular chatroom ";
  user: any = null;
  // {
  //   username: "",
  //   role: ""
  // }

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.user = this.authService.getUserInfo();
    };
    console.log(this.user);
  }

}