import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private.routing.module';

import { PrivateComponent } from './private.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule
  ],
  declarations: [
    PrivateComponent,
    MainNavComponent,
    MainPageComponent,
    UserProfileComponent
  ],
  providers: []
})
export class PrivateModule { }
