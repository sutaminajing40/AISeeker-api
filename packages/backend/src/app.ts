import express from 'express'
import fileUpload from 'express-fileupload'
import { ping } from './utils/send-ping'
import dotenv from 'dotenv'
import { PORT } from './utils/constants'
import pdfRouter from './pdf-management/pdf-router'
import queryRouter from './query-management/query-router'

const app = express()
const port = PORT
dotenv.config()
app.use(fileUpload())

app.get('/api/ping', ping)

app.use('/api/pdf', pdfRouter)

app.use('/api/query', queryRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
