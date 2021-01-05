import { Request, Response } from 'express';

import HttpStatusCode from '../util/HttpStatusCode';
import { Cart, CartItem } from '../models/cart';
import { Product } from '../models/product';

export class CartController {
  public async checkout(req: Request, res: Response): Promise<void> {
    try {
      const cart: Cart = req.body;
      if (!cart.cartItem || cart.cartItem.length <= 0) {
        res.sendStatus(HttpStatusCode.BAD_REQUEST);
      }
      const totalPrice = await CartController.calculateTotalPrice(cart.cartItem);
      res.status(HttpStatusCode.OK).json({totalPrice});
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString(),
      });
    }
  }

  private static async calculateTotalPrice(cartItems: CartItem[]) {
    let totalPrice = 0;
    await Promise.all(cartItems.map(async (cartItem) => {
      const product = await Product.findOne({id: cartItem.productId});
      totalPrice += product.price * cartItem.quantity;
    }));
    return totalPrice;
  }

}
