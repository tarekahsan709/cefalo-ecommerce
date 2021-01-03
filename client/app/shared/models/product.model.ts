export interface IVariant {
  color: string;
  size: string[];
  quantity: number;
}

export interface IProductResults {
  products: IProduct[];
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  available: boolean;
  variants: IVariant[];
  createdAt: Date;
  updatedAt: Date;
}
