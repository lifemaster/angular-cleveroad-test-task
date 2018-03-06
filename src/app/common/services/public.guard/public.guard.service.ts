import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class PublicGuardService implements CanActivate {

  constructor(protected router: Router, protected authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const isAuthorized = this.authService.isAuthorized();

    if (isAuthorized) {
      this.router.navigate(['/private']);
      return false;
    } else {
      return true;
    }
  }

}
