import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'user-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	constructor(
	) { }
	
	ngOnInit() {}

	newUser: any = {
		email: null,
		password: null,
		passwordConfirm: null
	}

}