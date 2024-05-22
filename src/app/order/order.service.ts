import { Product } from '../product/product.model'
import { TOrder } from './order.interface'
import Order from './order.model'

const createOrderIntoDB = async (orderData: TOrder) => {
  const orderId = orderData.productId
  const productFullData = await Product.findById(orderId)

  if (!productFullData) {
    throw new Error('Order not found')
  } else if (orderData.quantity > productFullData?.inventory?.quantity) {
    throw new Error('Insufficient quantity available in inventory')
  }
  //create Order =>main login start here
  else if (orderData.quantity <= productFullData?.inventory?.quantity) {
    // Reduce the inventory quantity
    productFullData.inventory.quantity -= orderData.quantity

    // Update inStock status
    productFullData.inventory.inStock = productFullData.inventory.quantity > 0
    await productFullData.save()
    const result = await Order.create(orderData)
    return result
  } else {
    throw new Error('Order not found')
  }
}

const getAllOrderFromDB = async () => {
  const result = await Order.find()
  return result
}
const getSearchedOrderFromDB = async (orderEmail: string) => {
  try {
    const result = await Order.find({
      email: orderEmail,
    })

    return result
  } catch (error) {
    const errorMessage = (error as Error).message
    throw new Error(`Unable to get order: ${errorMessage}`)
  }
}
export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getSearchedOrderFromDB,
}
