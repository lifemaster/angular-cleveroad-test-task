import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Product, ProductsService } from '../../../common/services/products/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  createProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(255),
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0.01),
      Validators.pattern(/^[0-9]+[\.|,]?[0-9]{0,2}$/)
    ]),
    description: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(1000),
      Validators.required
    ])
  });

  constructor(private _productService: ProductsService, private _router: Router) { }

  ngOnInit() {
  }

  submitForm() {
    const title = this.createProductForm.controls.title.value;
    const price = this.createProductForm.controls.price.value;
    const description = this.createProductForm.controls.description.value;

    const product: Product = { title, price, description };

    this._productService.addProduct(product);
    this._router.navigate(['private']);
  }

}
