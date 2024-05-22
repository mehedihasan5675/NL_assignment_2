import { Schema, model } from 'mongoose'
import { TOrder } from './order.interface'

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: [true, 'email field is required'] },
  productId: { type: String, required: [true, 'productId field is required'] },
  price: { type: Number, required: [true, 'price field is required'] },
  quantity: { type: Number, required: [true, 'number field is required'] },
})

const Order = model<TOrder>('Order', orderSchema)
export default Order
