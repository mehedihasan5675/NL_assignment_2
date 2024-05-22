import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { OrderRouters } from './app/order/order.routes'
import { ProductRouters } from './app/product/product.routes'
const app: Application = express()
//parsers
app.use(express.json())
app.use(cors())
//application route
app.use('/api/products', ProductRouters)
app.use('/api/orders', OrderRouters)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
