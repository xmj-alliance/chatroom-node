import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// services
import { AuthService } from '../../_services/auth.service';

@Component({
	selector: 'user-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	user: any = {
		name: null,
		password: null
	}

	constructor(
		@Inject(FormBuilder) fb: FormBuilder,
		private authService: AuthService
	) {
		this.constructForm(fb);
	}
	
	ngOnInit() {}

	constructForm (fb: FormBuilder) {
		this.form = fb.group({
			username: ['', [
				Validators.required
			]],
			password: ['', [
				Validators.required,
				Validators.minLength(6)
			]]
		});
	}

	login: () => any = async () => {
		if (!this.form.invalid) {
			try {
				let status = await this.authService.login(this.user);
			} catch(e) {
				console.log("Server anomoly detected");
			}
			
			switch (status) {
				case "Okay":
					//ok;
					console.log("Login success");
					break;
				case "Failed":
					//Failed
					console.log("Login Failed");
					break;
				default:
					console.log("Login anomoly detected");
					break;
			}
		} else {
			console.log("Your form is invalid. Submission aborted.");
		}
	};
}