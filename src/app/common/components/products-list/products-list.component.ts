import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

import { Product, ProductsService } from '../../services/products/products.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  isLoadingData = true;
  expandedElement: Product = null;
  displayedColumns = ['expandCollapse', 'select', 'title', 'price', 'edit'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  selection = new SelectionModel<Product>(true, []);

  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _productsService: ProductsService, private _router: Router) {
    this.subscriptions.push(this._productsService.productsSubject. subscribe(data => {
      if (data) {
        const mappedData = [];

        data.forEach(el => mappedData.push(el, { detailRow: true, element: el }));
        this.dataSource.data = mappedData;
        this.isLoadingData = false;

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

  rowClickHandler(e, row) {
    if (this.expandedElement && this.expandedElement.id === row.id) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
    }
  }

  isExpansionDetailRow(i, row) {
    return row.hasOwnProperty('detailRow');
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
