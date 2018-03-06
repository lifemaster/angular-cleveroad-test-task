import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

import { PublicGuardService } from '../common/services/public.guard/public.guard.service';
import { AuthGuardService } from '../common/services/auth.guard/auth.guard.service';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: '', loadChildren: './public/public.module#PublicModule', canActivate: [PublicGuardService] },
      { path: 'private', loadChildren: './private/private.module#PrivateModule', canActivate: [AuthGuardService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PublicGuardService, AuthGuardService]
})
export class PagesRoutingModule { }
