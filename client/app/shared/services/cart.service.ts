import { Injectable } from '@angular/core';
import { DEFAULT_CART, ICart, ICartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
  }

  addToCart(cartItem: ICartItem): void {
    let currentCart = this.getCurrentCart();
    currentCart.cartItem.push(cartItem);
    // FIXME: handle QuotaExceededError
    // FIXME: Move key name to constant
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  getCurrentCart(): ICart {
    let currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart === null) {
      // FIXME: handle QuotaExceededError
      localStorage.setItem('cart', JSON.stringify(DEFAULT_CART));
      currentCart = JSON.parse(localStorage.getItem('cart'));
    }
    return currentCart;
  }

  getNumberOfCartItems(): number {
    let currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart === null) {
      return 0;
    } else {
      return currentCart.cartItem.size;
    }
  }

}
