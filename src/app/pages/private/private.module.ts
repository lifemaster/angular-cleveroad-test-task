import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrivateRoutingModule } from './private.routing.module';

import {
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule
} from '@angular/material';

import { PrivateComponent } from './private.component';
import { MainNavComponent } from '../../common/components/main-nav/main-nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserInfoComponent } from '../../common/components/user-info/user-info.component';
import { ProductsListComponent } from '../../common/components/products-list/products-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

import { DecimalPipe } from '../../common/pipes/decimal/decimal.pipe';

import { ProductsService } from '../../common/services/products/products.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrivateRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  declarations: [
    PrivateComponent,
    MainNavComponent,
    MainPageComponent,
    UserInfoComponent,
    ProductsListComponent,
    UserProfileComponent,
    CreateProductComponent,
    EditProductComponent,
    DecimalPipe
  ],
  providers: [
    ProductsService
  ]
})
export class PrivateModule { }
