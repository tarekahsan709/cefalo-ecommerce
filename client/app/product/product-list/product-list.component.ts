import { Component, OnInit } from '@angular/core';

import { IProduct } from '../../shared/models/product.model';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[];

  constructor(
    private productSvc: ProductService,
    private cartSvc: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSvc.getProducts().subscribe(
      (data) => {
        this.products = data.products;
      },
      (err: any) => console.error('Products retrieved failed'),
      () => console.log('All product loaded')
    );
  }

  hasAlreadyAdded(product): boolean {
    return this.cartSvc.hasProductAdded(product.id);
  }
}
