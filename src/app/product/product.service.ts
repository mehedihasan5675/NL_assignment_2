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
const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId })
  return result
}
const deleteSingleProductFromDB = async (productId: string) => {
  try {
    const result = await Product.deleteOne({ _id: productId })

    if (result.deletedCount > 0) {
      const deletedProduct = await Product.findOne({ _id: productId })
      return deletedProduct
    }
  } catch (error) {
    const errorMessage = (error as Error).message
    throw new Error(`Unable to update product: ${errorMessage}`)
  }
}
const getProductBySearchFromDB = async (searchText: string) => {
  try {
    const result = await Product.find({
      $or: [
        { name: { $regex: searchText, $options: 'i' } },
        { description: { $regex: searchText, $options: 'i' } },
      ],
    })

    return result
  } catch (error) {
    const errorMessage = (error as Error).message
    throw new Error(`Unable to update product: ${errorMessage}`)
  }
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
  deleteSingleProductFromDB,
  getProductBySearchFromDB,
}
