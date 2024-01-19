const mongoose = require('mongoose')
const express = require('express')
const app = express()

const connectToMongo = require('./db')
connectToMongo();


const port = 5000
app.use(express.json())

// Routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes')) 



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
