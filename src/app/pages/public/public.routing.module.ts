import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicGuardService } from '../../common/services/public.guard/public.guard.service';

import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'all' },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PublicGuardService]
})
export class PublicRoutingModule { }
