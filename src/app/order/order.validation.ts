import { z } from 'zod'

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'email field is required' }),
  productId: z.string().min(1, { message: 'productId field is required' }),
  price: z.number().int().positive({ message: 'price field is required' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'quantity field is required' }),
})

export default orderValidationSchema
