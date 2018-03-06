import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {

  constructor(private _router: Router, private _cookieService: CookieService) { }

  isAuthorized() {
    return this._cookieService.get('token') === 'secret';
  }

  login() {
    this._cookieService.put('token', 'secret');
    this._router.navigate(['/private']);
  }

  logout() {
    this._cookieService.remove('token');
    this._router.navigate(['/login']);
  }
}
