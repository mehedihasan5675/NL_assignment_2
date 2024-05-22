import { Request, Response } from 'express'
import { OrderServices } from './order.service'
import orderValidationSchema from './order.validation'

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderdata = req.body
    const ZodParsedData = orderValidationSchema.parse(orderdata)

    const result = await OrderServices.createOrderIntoDB(ZodParsedData)
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (err) {
    const errorMessage = (err as Error).message
    res.status(500).json({
      success: false,
      message: errorMessage || 'something went wrong to create order',
      error: err,
    })
  }
}
const getAllOrderOrSearchedOrder = async (req: Request, res: Response) => {
  try {
    const emailFromQueryParams = req.query.email

    if (emailFromQueryParams) {
      const result = await OrderServices.getSearchedOrderFromDB(
        emailFromQueryParams as string,
      )
      if (result.length > 0) {
        res.json({
          success: true,
          message: `Orders fetched successfully for user email! `,
          data: result,
        })
      } else {
        res.json({
          success: true,
          message: `There has no order with this value:  ${emailFromQueryParams}   `,
          data: result,
        })
      }
    } else {
      const result = await OrderServices.getAllOrderFromDB()
      res.json({
        success: true,
        message: ' all Orders fetched successfully!',
        data: result,
      })
    }
  } catch (err) {
    const errorMessage = (err as Error).message
    res.status(500).json({
      success: false,
      message: errorMessage || 'something went wrong to get all product',
      error: err,
    })
  }
}
export const OrderControllers = {
  createOrder,
  getAllOrderOrSearchedOrder,
}
