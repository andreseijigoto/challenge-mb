import express from 'express'
import cors from 'cors'
import registration from './routes/registration/registration.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/registration', registration)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
