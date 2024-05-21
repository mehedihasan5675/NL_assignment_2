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

const UpdateProductIntoDB = async (
  productId: string,
  updatedData: Partial<TProduct>,
) => {
  try {
    const result = await Product.updateOne(
      { _id: productId },
      { $set: updatedData },
    )
    if (result.modifiedCount > 0) {
      const updatedProduct = await Product.findOne({ _id: productId })
      return updatedProduct
    } else {
      return 'ensure that product data has been updated !'
    }
  } catch (error) {
    const errorMessage = (error as Error).message
    throw new Error(`Unable to update product: ${errorMessage}`)
  }
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  UpdateProductIntoDB,
}
