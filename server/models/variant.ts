import { Document, Schema } from 'mongoose';

export interface IVariant extends Document {
  color: string;
  size: string[];
  quantity: number;
}

export const variantSchema: Schema = new Schema({
  color: String,
  size: {
    type: [String],
    enum: ['small', 'medium', 'large', 'extra-large'],
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
});
