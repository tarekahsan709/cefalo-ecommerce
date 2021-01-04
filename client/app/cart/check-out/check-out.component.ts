import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { ICart } from '../../shared/models/cart.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  cart: ICart;

  constructor(private cartSvc: CartService) {
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

}
