import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/models/product.model';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: IProduct[];

  constructor(private productSvc: ProductService,
              public toast: ToastComponent) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSvc.getProducts().subscribe(
      (data) => {
        this.products = data.products;
      },
      (err: any) => this.toast.setMessage('Products retrieved failed', 'danger'),
      () => this.toast.setMessage('All product loaded', 'success'));
  }

}
