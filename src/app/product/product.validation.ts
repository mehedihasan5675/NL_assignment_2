import { z } from 'zod'
const variantsValidationSchema = z.object({
  type: z.string().min(1, { message: 'The type field is required' }),
  value: z.string().min(1, { message: 'The value field is required' }),
})

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .nonnegative()
    .int()
    .refine((val) => val >= 0, { message: 'The quantity field is required' }),
  inStock: z.boolean().default(true).describe('The inStock field is required'),
})

const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'The name field is required' }),
  description: z
    .string()
    .min(1, { message: 'The description field is required' }),
  price: z.number().positive({ message: 'The price field is required' }),
  category: z.string().min(1, { message: 'The category field is required' }),
  tags: z.array(z.string()).min(1, { message: 'The tags field is required' }),
  variants: z
    .array(variantsValidationSchema)
    .min(1, { message: 'The variants field is required' }),
  inventory: inventoryValidationSchema,
})
export default productValidationSchema
