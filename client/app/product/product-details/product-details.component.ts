import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ProductService } from '../../shared/services/product.service';
import { IProduct, IVariant } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  defaultQuantity = 1;
  selectedColor: string;
  selectedSizeList: string[];
  selectedSize: string;

  product: IProduct;
  variants: IVariant[];
  selectedVariant: IVariant;

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
        console.log(this.product);
        this.loadDefaultVariant();
      },
      (err: any) => this.toast.setMessage('Product retrieved failed!', 'danger'),
      () => this.toast.setMessage('Product details has loaded', 'success'));
  }

  loadDefaultVariant(): void {
    this.variants = this.product.variants;

    if (this.variants.length > 0) {
      this.selectedVariant = this.variants[0];
      this.selectedColor = this.selectedVariant.color;
      this.selectedSizeList = this.selectedVariant.size;
    }
  }

  onChangeColor(color): void {
    this.selectedColor =  color;
    this.selectedSizeList = this.variants.find( v => v.color === color).size;
    console.log("Selected color", color);
    console.log("Selected color sizeList", this.selectedSizeList);
  }

  onChangeSize(size): void {
    this.selectedSize = size;
    console.log("Selected size", size);
  }

}
