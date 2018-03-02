import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('Костя', [
      Validators.minLength(1),
      Validators.maxLength(255),
      Validators.required
    ]),
    lastName: new FormControl('Шийка', [
      Validators.minLength(1),
      Validators.maxLength(255),
      Validators.required
    ]),
    email: new FormControl('kostya.shyika@gmail.com', [
      Validators.email,
      Validators.required
    ]),
    phone: new FormControl('+380632348572', Validators.pattern(new RegExp(/^\+380\d{9}$/))),
    // password: new FormControl('', this.passwordValidator),
    // confirmPassword: new FormControl('', this.passwordValidator)
  });

  showChangePasswordMode = false;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  // passwordValidator(control: FormControl) {
  //   if (this.profileForm.controls.password.value !== this.profileForm.controls.confirmPassword.value) {
  //     return {
  //       password: true,
  //       confirmPassword: true
  //     };
  //   }

  //   return null;
  // }

  // showChangePassword() {
  //   this.showChangePasswordMode = true;
  // }

  submitForm() {
    const firstName = this.profileForm.controls.firstName.value;
    const lastName = this.profileForm.controls.lastName.value;
    const email = this.profileForm.controls.email.value;
    const phone = this.profileForm.controls.phone.value;

    console.log({ firstName, lastName, email, phone });

    this.openSnackBar('Данные сохранены', 'Закрыть');
  }
}
