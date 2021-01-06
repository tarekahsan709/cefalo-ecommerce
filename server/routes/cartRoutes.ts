import { Router } from 'express';

import { isAuthenticate } from '../auth/authService';
import { CartController } from '../controllers/cartController';

export class CartRoutes {
  public router: Router;
  public cartController: CartController = new CartController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/checkout', isAuthenticate, this.cartController.checkout);
  }
}
