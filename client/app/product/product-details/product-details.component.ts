import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import RoutesUrl from 'client/app/shared/util/routes-url';
import ToastMessage from 'client/app/shared/util/toast-message';
import { ToastrService } from 'ngx-toastr';

import { ICartItem } from '../../shared/models/cart.model';
import { IProduct, IVariant } from '../../shared/models/product.model';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  private readonly defaultQuantity = 1;
  selectedColor: string;
  selectedSizeList: string[];
  selectedSize: string;

  product: IProduct;
  variants: IVariant[];
  selectedVariant: IVariant;

  private readonly firstItemIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productSvc: ProductService,
    private toastr: ToastrService,
    private cartSvc: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProductDetails(id);
  }

  getProductDetails(id: string): void {
    this.productSvc.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        this.loadDefaultVariant();
      },
      (err: any) => console.error('Failed to retrieve product!'),
      () => console.debug('Product details has loaded')
    );
  }

  loadDefaultVariant(): void {
    this.variants = this.product.variants;

    if (this.variants.length > 0) {
      this.selectedVariant = this.variants[this.firstItemIndex];
      this.selectedColor = this.selectedVariant.color;
      this.selectedSizeList = this.selectedVariant.size;
      this.selectedSize = this.selectedSizeList[this.firstItemIndex];
    }
  }

  onChangeColor(color): void {
    this.selectedVariant = this.variants.find((v) => v.color === color);
    this.selectedColor = color;
    this.selectedSizeList = this.variants.find((v) => v.color === color).size;
    this.selectedSize = this.selectedSizeList[this.firstItemIndex];
  }

  onChangeSize(size): void {
    this.selectedSize = size;
  }

  addToCart(): void {
    const cartItem: ICartItem = {
      id: Math.floor(Math.random() * 5000000),
      productId: this.product.id,
      productPrice: this.product.price,
      productName: this.product.name,
      variantColor: this.selectedColor,
      variantSize: this.selectedSize,
      quantity: this.defaultQuantity,
      quantityInStock: this.selectedVariant.quantity,
    };

    this.cartSvc.addToCart(cartItem);
    this.toastr.success(ToastMessage.PRODUCT_ADDED);
    this.router.navigateByUrl(RoutesUrl.PRODUCT);
  }
}
