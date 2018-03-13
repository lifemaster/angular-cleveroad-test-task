import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { PrivateComponent } from './private.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

import { AuthGuardService } from '../../common/services/auth.guard/auth.guard.service';

const routes: Routes = [
  {
    path: '', component: PrivateComponent, children: [
      { path: '', component: MainPageComponent, pathMatch: 'all' },
      { path: 'profile', component: UserProfileComponent },
      { path: 'product/create', component: CreateProductComponent },
      { path: 'product/edit/:id', component: EditProductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
