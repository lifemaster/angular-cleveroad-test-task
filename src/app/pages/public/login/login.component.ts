import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../../common/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
      Validators.pattern(new RegExp('[a-zA-Z0-9]'))
    ]),
    rememberMe: new FormControl(false)
  });

  constructor(private _router: Router, private _authService: AuthService) { }

  ngOnInit() {
    const isAuthorized = this._authService.isAuthorized();

    if (isAuthorized) {
      this._router.navigate(['/']);
    }
  }

  submitForm() {
    if (this.loginForm.invalid) {
      return;
    }

    const controls = this.loginForm.controls;
    const email = controls.email.value;
    const password = controls.password.value;
    const rememberMe = controls.rememberMe.value;

    console.log({ email, password, rememberMe });

    this._authService.login();
  }

}
