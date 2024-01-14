const mongoose = require('mongoose')
const express = require('express')

const connectToMongo = require('./db')
connectToMongo();


const app = express()
const port = 3000

// ROutes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/auth', require('./Routes/notes')) 



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
