import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import RoutesUrl from 'client/app/shared/util/routes-url';
import ToastMessage from 'client/app/shared/util/toast-message';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { ICart } from '../../shared/models/cart.model';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  modalRef: BsModalRef;

  cart: ICart;
  totalPrice: number;

  constructor(
    private cartSvc: CartService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartSvc.getCurrentCart();
    this.loadTotalPrice();
  }

  private loadTotalPrice(): void {
    this.cartSvc.getTotalPrice(this.cart).subscribe((data) => {
      this.totalPrice = data.totalPrice;
    });
  }

  calculateTotalPrice(): void {
    let total = 0;
    this.cart.cartItem.forEach((cartItem, index) => {
      total += cartItem.productPrice * cartItem.quantity;
    });
    this.totalPrice = total;
  }

  onQuantityChange(cartItem): void {
    if (
      cartItem.quantity <= 0 ||
      cartItem.quantity > cartItem.quantityInStock
    ) {
      this.cart.cartItem.map((item) => {
        if (item.id === cartItem.id) {
          const currentCart = this.cartSvc.getCurrentCart();
          item.quantity = currentCart.cartItem.find(
            (currentItem) => currentItem.id === cartItem.id
          ).quantity;
        }
      });
      this.toastr.warning(ToastMessage.QUANTITY_UNAVAILABLE);
    } else {
      this.calculateTotalPrice();
    }
  }

  onRemoveItem(removedItem): void {
    this.cart.cartItem = this.cart.cartItem.filter(
      (cartItem) => cartItem.productId !== removedItem.productId
    );
    if (this.cart.cartItem.length === 0) {
      this.toastr.warning(ToastMessage.EMPTY_CART);
      this.cartSvc.clearCart();
      this.router.navigateByUrl(RoutesUrl.PRODUCT);
    }
  }

  onCheckout(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.toastr.success(ToastMessage.SUCCESSFULL_CHECKOUT);
    this.cartSvc.clearCart();
    this.router.navigateByUrl(RoutesUrl.PRODUCT);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
