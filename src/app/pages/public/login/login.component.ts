import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../../common/services/auth/auth.service';
import { UserInfoService } from '../../../common/services/user.info/user.info.service';

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

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userInfoService: UserInfoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  submitForm() {
    if (this.loginForm.invalid) {
      return;
    }

    const controls = this.loginForm.controls;
    const email = controls.email.value;
    const password = controls.password.value;
    const rememberMe = controls.rememberMe.value;

    const userInfo = this._userInfoService.userInfoSubject.getValue();

    if (email === userInfo.email && password === userInfo.password) {
      this._authService.login();
    } else {
      this.openSnackBar('Неверные email и/или пароль', 'Закрыть');
    }
  }

}
