import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { PrivateComponent } from './private.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuardService } from '../../common/services/auth.guard/auth.guard.service';

const routes: Routes = [
  {
    path: '', component: PrivateComponent, children: [
      { path: '', component: MainPageComponent, canActivate: [AuthGuardService] },
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
