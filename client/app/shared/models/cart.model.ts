export interface ICartItem {
  id: number;
  productId: string;
  productName: string;
  variantColor: string;
  variantSize: string;
  productPrice: number;
  quantity: number;
  quantityInStock: number;
}

export interface ICart {
  id: number;
  cartItem: ICartItem[];
}

export const DEFAULT_CART: ICart = {
  id: Math.floor(Math.random() * 5000000),
  cartItem: []
};
