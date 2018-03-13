import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

import { Product, ProductsService } from '../../services/products/products.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  isLoadingData = true;

  displayedColumns = ['select', 'title', 'price', 'edit'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  selection = new SelectionModel<Product>(true, []);

  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _productsService: ProductsService, private _router: Router) {
    this.subscriptions.push(this._productsService.productsSubject. subscribe(data => {
      if (data) {
        this.isLoadingData = false;
        this.dataSource.data = data;
        setTimeout(() => this.dataSource.paginator = this.paginator);
      }
    }));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onCreate() {
    this._router.navigate(['/private/product/create']);
  }

  onEdit(id) {
    this._router.navigate([`/private/product/edit/${id}`]);
  }

  onDelete() {
    const ids = this.selection.selected.map(product => product.id);
    this._productsService.removeProducts(ids);
    this.selection.clear();
  }
}
