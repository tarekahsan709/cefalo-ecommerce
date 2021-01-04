import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  constructor(private activatedRoute: ActivatedRoute,
              private toast: ToastComponent,
              private productSvc: ProductService) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProductDetails(id);
  }

  getProductDetails(id: string): void {
    this.productSvc.getProductById(id).subscribe(
      (data) => {
        this.product = data;
      },
      (err: any) => this.toast.setMessage('Product retrieved failed!', 'danger'),
      () => this.toast.setMessage('Product details has loaded', 'success'));
  }
}
