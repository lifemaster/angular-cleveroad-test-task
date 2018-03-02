import { Injectable } from '@angular/core';

export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

@Injectable()
export class ProductsService {
  products: Product[] = [
    { id: 1, title: 'Product 1', description: 'Description for product 1', price: 10 },
    { id: 2, title: 'Product 2', description: 'Description for product 2', price: 20 },
    { id: 3, title: 'Product 3', description: 'Description for product 3', price: 30 },
    { id: 4, title: 'Product 4', description: 'Description for product 4', price: 40 },
    { id: 5, title: 'Product 5', description: 'Description for product 5', price: 50 },
    { id: 6, title: 'Product 6', description: 'Description for product 6', price: 60 },
    { id: 7, title: 'Product 7', description: 'Description for product 7', price: 70 },
    { id: 8, title: 'Product 8', description: 'Description for product 8', price: 80 },
    { id: 9, title: 'Product 9', description: 'Description for product 9', price: 90 },
    { id: 10, title: 'Product 10', description: 'Description for product 10', price: 100 }
  ];

  constructor() { }

  getProducts() {
    return this.products;
  }

  addProduct(product:  Product) {
    this.products.push(product);
  }

  editProduct(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id);

    if (index >= 0) {
      this.products[index] = product;
    }
  }

  removeProduct(id: number) {
    const index = this.products.findIndex(p => p.id === id);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }
}
