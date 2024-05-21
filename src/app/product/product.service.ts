import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product)
  return result
}
const getAllProductFromDB = async () => {
  const result = await Product.find()
  return result
}
const getSingleProductFromDB = async (productId: any) => {
  const result = await Product.findOne({ _id: productId }).exec()
  return result
}
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
}
