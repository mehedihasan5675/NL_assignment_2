import mongoose, { model } from 'mongoose'
import { TInventory, TProduct, TVariant } from './product.interface'
const { Schema } = mongoose
const variantsSchema = new Schema<TVariant>({
  type: { type: String, required: [true, 'The type field is required'] },
  value: { type: String, required: [true, 'The value field is required'] },
})
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'The quantity field is required'],
  },
  inStock: {
    type: Boolean,
    default: true,
    required: [true, 'The inStock field is required'],
  },
})
const productSchema = new Schema<TProduct>({
  name: { type: String, required: [true, 'The name field is required'] },
  description: {
    type: String,
    required: [true, 'The description field is required'],
  },
  price: { type: Number, required: [true, 'The price field is required'] },
  category: {
    type: String,
    required: [true, 'The category field is required'],
  },
  tags: { type: [String], required: [true, 'The tags field is required'] },
  variants: {
    type: [variantsSchema],
    required: [true, 'The variants field is required'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'The inventory field is required'],
  },
})
export const Product = model<TProduct>('Product', productSchema)
