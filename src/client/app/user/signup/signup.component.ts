import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { matchOtherValidator } from "../../_utils/match-other-validator";

@Component({
	selector: 'user-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

	repeatPassword: string = null;
	form: FormGroup;

	newUser: any = {
		email: null,
		password: null
	}

	constructForm (fb: FormBuilder) {
		this.form = fb.group({
			email: ['', [
				Validators.required,
				Validators.email
			]],
			password: ['', [
				Validators.required,
				Validators.minLength(6)
			]],
			repeatPassword: ['', [
				Validators.required,
				matchOtherValidator('password')
			]]
		});
	}

	signup = () => {
		console.log(this.form.controls);
		if (!this.form.invalid) {
			
			console.log(this.newUser);
		} else {
			console.log("Your form is invalid. Submission aborted.");
		}

	};

	constructor(
		@Inject(FormBuilder) fb: FormBuilder,
		private renderer: Renderer2
	) {
		this.constructForm(fb);
	}
	
	ngOnInit() {
		let appPanel = document.querySelector("#appPanel");
		this.renderer.addClass(appPanel, "hide");
	}

	ngOnDestroy() {
		let appPanel = document.querySelector("#appPanel");
		this.renderer.removeClass(appPanel, "hide");
	}



}