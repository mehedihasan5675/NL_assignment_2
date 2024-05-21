import { Request, Response } from 'express'
import { ProductServices } from './product.service'
import productValidationSchema from './product.validation'

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const ZodParsedData = productValidationSchema.parse(productData)
    const result = await ProductServices.createProductIntoDB(ZodParsedData)
    res.json({
      success: true,
      message: 'Product is created successfully !',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong to create product',
      error: err,
    })
  }
}

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB()
    res.json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong to get all product',
      error: err,
    })
  }
}

export const ProductController = {
  createProduct,
  getAllProduct,
}
