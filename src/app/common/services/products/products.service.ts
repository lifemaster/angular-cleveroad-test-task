import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Product {
  id?: number;
  title: string;
  description: string;
  price: number;
}

@Injectable()
export class ProductsService {
  productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject(null);

  constructor() {
   setTimeout(() => {
      this.productsSubject.next([
        { id: 1, title: 'Product 1', description: 'Description for product 1', price: 10 },
        { id: 2, title: 'Product 2', description: 'Description for product 2', price: 20 },
        { id: 3, title: 'Product 3', description: 'Description for product 3', price: 30 },
        { id: 4, title: 'Product 4', description: 'Description for product 4', price: 40 },
        { id: 5, title: 'Product 5', description: 'Description for product 5', price: 50 },
        { id: 6, title: 'Product 6', description: 'Description for product 6', price: 60 },
        { id: 7, title: 'Product 7', description: 'Description for product 7', price: 70 },
        { id: 8, title: 'Product 8', description: 'Description for product 8', price: 80 },
        { id: 9, title: 'Product 9', description: 'Description for product 9', price: 90 },
        { id: 10, title: 'Product 10', description: 'Description for product 10', price: 100 },
        { id: 11, title: 'Product 11', description: 'Description for product 11', price: 110 },
        { id: 12, title: 'Product 12', description: 'Description for product 12', price: 120 },
        { id: 13, title: 'Product 13', description: 'Description for product 13', price: 130 },
        { id: 14, title: 'Product 14', description: 'Description for product 14', price: 140 },
        { id: 15, title: 'Product 15', description: 'Description for product 15', price: 150 },
        { id: 16, title: 'Product 16', description: 'Description for product 16', price: 160 },
        { id: 17, title: 'Product 17', description: 'Description for product 17', price: 170 },
        { id: 18, title: 'Product 18', description: 'Description for product 18', price: 180 },
        { id: 19, title: 'Product 19', description: 'Description for product 19', price: 190 },
        { id: 20, title: 'Product 20', description: 'Description for product 20', price: 200 },
        { id: 21, title: 'Product 21', description: 'Description for product 21', price: 210 },
        { id: 22, title: 'Product 22', description: 'Description for product 22', price: 220 },
        { id: 23, title: 'Product 23', description: 'Description for product 23', price: 230 },
        { id: 24, title: 'Product 24', description: 'Description for product 24', price: 240 },
        { id: 25, title: 'Product 25', description: 'Description for product 25', price: 250 },
      ]);
    }, 1000);
  }

  addProduct(product:  Product) {
    const products = this.productsSubject.getValue();
    const lastId = products.reduce((id, item) => {
      if (item.id > id) {
        return item.id;
      }
    }, 0);

    product.id = lastId + 1;

    products.push(product);
    this.productsSubject.next(products);
  }

  editProduct(product: Product) {
    const products = this.productsSubject.getValue();
    const index = products.findIndex(p => p.id === product.id);

    if (index >= 0) {
      products[index] = product;
      this.productsSubject.next(products);
    }
  }

  removeProducts(ids: number[]) {
    const products = this.productsSubject.getValue();
    const indexes = [];

    ids.forEach(id => {
      const index = products.findIndex(p => p.id === id);
      if (index >= 0) {
        products.splice(index, 1);
      }
    });

    this.productsSubject.next(products);
  }
}
