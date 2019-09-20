//load express
const express = require('express')
const app = express()

//load mongoose
const mongoose = require('mongoose')

//set mongoose and useNewURLParser以及不知為何出現叫我裝 { useUnifiedTopology: true }的warning
mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })

//test mongodb connection
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//load record model
const Record = require('./models/record')

//route 
app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
  console.log('App is running')
})