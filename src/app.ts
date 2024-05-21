import cors from 'cors'
import express, { Application, Request, Response } from 'express'
const app: Application = express()
//parsers
app.use(express.json())
app.use(cors())
//application route
// app.use('/api/products', ProductRoute)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
