import { Document, Model, model, Schema } from 'mongoose';

import { IVariant, variantSchema } from './variant';

export interface IProduct extends Document {
  id: number;
  name: string;
  price: number;
  available: boolean;
  variants: IVariant[];
}

export const productSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  variants: [variantSchema],
});

export const Product: Model<IProduct> = model<IProduct>(
  'Product',
  productSchema
);
