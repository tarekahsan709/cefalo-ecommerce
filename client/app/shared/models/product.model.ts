export interface IVariant {
  color: string;
  size: string[];
  quantity: number;
}

export const DEFAULT_VARIANT: IVariant = {
  color: null,
  size: [],
  quantity: 0,
};

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
