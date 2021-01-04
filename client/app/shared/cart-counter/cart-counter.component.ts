import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.scss'],
})
export class CartCounterComponent implements OnInit {
  numberOfItemInCart = 0;

  constructor(private cartSvc: CartService) {
  }

  ngOnInit(): void {
    this.listenCartCounter();
  }

  listenCartCounter(): void {
    this.cartSvc.hasCartUpdated.subscribe(hasCartUpdated => {
      console.log("listenCartCounter", hasCartUpdated);
      this.updateCartCounter();
    })
  }

  updateCartCounter(): void {
    console.log("getNumberOfItemInCart", this.cartSvc.getNumberOfItemInCart());
    this.numberOfItemInCart = this.cartSvc.getNumberOfItemInCart();
  }

}
