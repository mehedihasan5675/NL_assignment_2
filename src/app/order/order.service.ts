import { TOrder } from './order.interface'
import Order from './order.model'

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData)
  return result
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
