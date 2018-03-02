import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicRoutingModule } from './public.routing.module';

import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';

import {
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  declarations: [
    PublicComponent,
    LoginComponent
  ]
})
export class PublicModule { }
