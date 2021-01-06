import { Component, OnInit } from '@angular/core';
import { CartService } from 'client/app/shared/services/cart.service';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthService, private cartSvc: CartService) {
    this.cartSvc.clearCart();
    this.auth.logout();
  }

  ngOnInit(): void {}
}
