import { Component, OnInit, TemplateRef } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { ICart } from '../../shared/models/cart.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  modalRef: BsModalRef;

  cart: ICart;

  constructor(private cartSvc: CartService,
              private modalService: BsModalService) {
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
