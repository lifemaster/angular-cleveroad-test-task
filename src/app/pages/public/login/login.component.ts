import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../common/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthService) { }

  ngOnInit() {
    const isAuthorized = this._authService.isAuthorized();

    if (isAuthorized) {
      this._router.navigate(['/']);
    }
  }
}
