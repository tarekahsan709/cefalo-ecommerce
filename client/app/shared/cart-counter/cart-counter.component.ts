import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.scss'],
})
export class CartCounterComponent implements OnInit {
  numberOfItemInCart = 0;
  hasItemInCart = false;

  constructor(private cartSvc: CartService) {
  }

  ngOnInit(): void {
    this.listenCartCounter();
  }

  listenCartCounter(): void {
    this.cartSvc.hasCartUpdated.subscribe(hasCartUpdated => {
      this.updateCartCounter();
    })
  }

  updateCartCounter(): void {
    this.numberOfItemInCart = this.cartSvc.getNumberOfItemInCart();
    if (this.numberOfItemInCart > 0) {
      this.hasItemInCart = true;
    }
  }


}
