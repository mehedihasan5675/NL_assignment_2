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
  } catch (err) {
    const errorMessage = (err as Error).message
    res.status(500).json({
      success: false,
      message: errorMessage || 'something went wrong to create product',
      error: err,
    })
  }
}

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTermText = req.query.searchTerm
    if (searchTermText) {
      const result = await ProductServices.getProductBySearchFromDB(
        searchTermText as string,
      )
      if (result.length > 0) {
        res.json({
          success: true,
          message: `Products matching search term ${searchTermText} fetched successfully!  `,
          data: result,
        })
      } else {
        res.json({
          success: true,
          message: `There has no products with this value:  ${searchTermText}   `,
          data: result,
        })
      }
    } else {
      const result = await ProductServices.getAllProductFromDB()
      res.json({
        success: true,
        message: ' all Products fetched successfully!',
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
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const updateData = req.body
    const result = await ProductServices.UpdateProductIntoDB(
      productId,
      updateData,
    )

    res.json({
      success: true,
      message: 'Products updated successfully!',
      data: result,
    })
  } catch (err) {
    const errorMessage = (err as Error).message
    res.status(500).json({
      success: false,
      message: errorMessage || 'something went wrong to get all product',
      error: err,
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await ProductServices.deleteSingleProductFromDB(productId)
    res.json({
      success: true,
      message: 'Products deleted successfully!',
      data: result,
    })
  } catch (err) {
    const errorMessage = (err as Error).message
    res.status(500).json({
      success: false,
      message: errorMessage || 'something went wrong to get all product',
      error: err,
    })
  }
}
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await ProductServices.getSingleProductFromDB(productId)

    res.json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err) {
    const errorMessage = (err as Error).message
    res.status(500).json({
      success: false,
      message: errorMessage || 'something went wrong to get all product',
      error: err,
    })
  }
}

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
