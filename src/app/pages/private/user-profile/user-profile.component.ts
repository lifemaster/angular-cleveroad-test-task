import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { UserInfoService, UserInfo } from '../../../common/services/user.info/user.info.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(255),
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(255),
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    phone: new FormControl('', Validators.pattern(/^\+380\d{9}$/)),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  }, {
    validators: [this.passwordValidator]
  });

  showChangePasswordMode = false;
  isLoadingData = true;
  subscriptions: Subscription[] = [];

  constructor(private _snackBar: MatSnackBar, private _userInfoService: UserInfoService) {
    this.subscriptions.push(this._userInfoService.userInfoSubject.subscribe(userInfo => {
      if (userInfo) {
        this.isLoadingData = false;

        this.profileForm.controls.firstName.setValue(userInfo.firstName);
        this.profileForm.controls.lastName.setValue(userInfo.lastName);
        this.profileForm.controls.email.setValue(userInfo.email);
        this.profileForm.controls.phone.setValue(userInfo.phone);
      }
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  showChangePassword() {
    this.showChangePasswordMode = true;
  }

  passwordValidator(formGroup: FormGroup) {
    const password = formGroup.controls.password.value;
    const confirmPassword = formGroup.controls.confirmPassword.value;

    if (!password && !confirmPassword) {
      return null;
    }

    if (password === confirmPassword && password.length >= 6) {
      return null;
    }

    if (password !== confirmPassword) {
      return {
        passwordMismatch: true
      };
    }

    if (password.length < 6) {
      return {
        passwordTooShort: true
      };
    }

    return null;
  }

  submitForm() {
    const firstName = this.profileForm.controls.firstName.value;
    const lastName = this.profileForm.controls.lastName.value;
    const email = this.profileForm.controls.email.value;
    const phone = this.profileForm.controls.phone.value;
    const password = this.profileForm.controls.password.value;

    const userInfo: UserInfo = { firstName, lastName, email, phone };

    if (password) {
      userInfo.password = password;
    }

    this._userInfoService.editUserInfo(userInfo);
    this.openSnackBar('Данные сохранены', 'Закрыть');
  }
}
