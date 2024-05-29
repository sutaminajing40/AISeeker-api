import express from 'express'
import fileUpload from 'express-fileupload'
import { ping } from './controllers/sendPing'
import { registPdf } from './pdf-management/registPdf'
import dotenv from 'dotenv'

const app = express()
const port = 3000

dotenv.config()
app.use(fileUpload())

app.get('/api/ping', ping)

app.post('/api/pdf', registPdf)

app.delete('/api/pdf', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/query', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
