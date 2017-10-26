import { Component, OnInit } from '@angular/core';

import { AuthService } from "../_services/auth.service";

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	user: any = null;

	constructor(
		private authService: AuthService
	) { }
	
	ngOnInit() {
    if (this.authService.loggedIn()) {
      this.user = this.authService.getUserInfo();
    };
    console.log(this.user);
	}

}