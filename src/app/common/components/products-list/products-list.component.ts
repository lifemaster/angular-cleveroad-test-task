import { Component, OnInit } from '@angular/core';

import { Product, ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  data: Product[] = [];
  isLoadingData = true;

  constructor(private _productsService: ProductsService) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoadingData = false;
      this.data = this._productsService.getProducts();
    }, 1000);
  }
}
