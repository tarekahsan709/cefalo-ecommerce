export interface CartItem {
  id: number;
  productId: string;
  productName: string;
  variantColor: string;
  variantSize: string;
  productPrice: number;
  quantity: number;
  quantityInStock: number;
}

export interface Cart {
  id: number;
  cartItem: CartItem[];
}

