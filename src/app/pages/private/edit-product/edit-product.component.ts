import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Product, ProductsService } from '../../../common/services/products/products.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {

  public isLoadingData = true;
  public product: Product;

  private productId: number;
  private subscription: Subscription[] = [];

  editProductForm: FormGroup = new FormGroup({
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

  constructor(
    private _productService: ProductsService,
    private _router: Router,
    private _route: ActivatedRoute) {
      this.subscription.push(this._productService.productsSubject.subscribe(products => {
        if (!products) {
          return;
        }

        this.productId = parseInt(this._route.snapshot.params.id, 10);
        const index = products.findIndex(p => p.id === this.productId);
        this.isLoadingData = false;

        if (index === -1) {
          return;
        }

        this.product = products[index];

        this.editProductForm.controls.title.setValue(this.product.title);
        this.editProductForm.controls.price.setValue(this.product.price.toFixed(2));
        this.editProductForm.controls.description.setValue(this.product.description);
      }));
    }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
  }

  submitForm() {
    const title = this.editProductForm.controls.title.value;
    const price = parseFloat(this.editProductForm.controls.price.value);
    const description = this.editProductForm.controls.description.value;

    const product: Product = { id: this.productId, title, price, description };

    this._productService.editProduct(product);
    this._router.navigate(['private']);
  }

}
