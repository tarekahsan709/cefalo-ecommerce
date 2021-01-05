import { Component, OnInit, TemplateRef } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { ICart } from '../../shared/models/cart.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  modalRef: BsModalRef;

  cart: ICart;

  constructor(private cartSvc: CartService,
              private modalService: BsModalService,
              private toast: ToastComponent) {
  }

  ngOnInit(): void {
    this.cart = this.cartSvc.getCurrentCart();
  }

  getTotalPrice() {
    let total = 0;
    this.cart.cartItem.forEach((cartItem, index) => {
      total += cartItem.productPrice * cartItem.quantity;
    })
    return total;
  }

  onQuantityChange(cartItem): void {
    if (cartItem.quantity <= 0 || cartItem.quantity > cartItem.quantityInStock) {
      this.cart.cartItem.map(item => {
        if (item.id === cartItem.id) {
          const currentCart = this.cartSvc.getCurrentCart();
          item.quantity = currentCart.cartItem.find(item => item.id === cartItem.id).quantity;
        }
      })
      alert("Quantity unavailable")
      this.toast.setMessage('Quantity unavailable', 'warning', 4000);
    }
  }

  resetQuantity(): void {

  }

  onRemoveItem(removedItem) {
    this.cart.cartItem = this.cart.cartItem.filter(cartItem => cartItem.productId !== removedItem.productId);
  }

  onCheckout(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
