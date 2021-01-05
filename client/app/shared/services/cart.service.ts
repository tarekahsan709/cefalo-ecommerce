import { Injectable } from '@angular/core';
import { DEFAULT_CART, ICart, ICartItem } from '../models/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public hasCartUpdated: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.hasCartUpdated = new BehaviorSubject<boolean>(true);
  }

  addToCart(cartItem: ICartItem): void {
    let currentCart = this.getCurrentCart();
    currentCart.cartItem.push(cartItem);
    // FIXME: handle QuotaExceededError
    // FIXME: Move key name to constant
    localStorage.setItem('cart', JSON.stringify(currentCart));
    this.hasCartUpdated.next(true);
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

  getNumberOfItemInCart(): number {
    let currentCart = JSON.parse(localStorage.getItem('cart'));
    console.log(currentCart);
    if (currentCart === null) {
      return 0;
    } else {
      return currentCart.cartItem.length;
    }
  }

  getTotalPrice(cart: ICart): Observable<any> {
    return this.http.post('/api/v1/carts/checkout', cart);
  }

  hasProductAdded(productId): boolean {
    const currentCart = this.getCurrentCart();
    let cartItem = currentCart.cartItem.find(item => item.productId === productId)
    return !!(cartItem);
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    this.hasCartUpdated.next(true);
  }

}
