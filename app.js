//load express
const express = require('express')
const app = express()

//load mongoose
const mongoose = require('mongoose')

//load express handlebars
const exphbs = require('express-handlebars')

//set handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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
//首頁
app.get('/', (req, res) => {
  Record.find((err, records) => {
    if (err) return console.error(err)
    return res.render('index', { records: records })
  })

})

//列出全部項目
app.get('/records', (req, res) => {
  return res.redirect('/')
})

//新增介面
app.get('/records/new', (req, res) => {
  res.send('新增介面')
})

//新增
app.post('/records', (req, res) => {
  res.send('新增')
})

//編輯介面
app.get('/records/:_id/edit', (req, res) => {
  res.send('編輯介面')
})

//編輯
app.post('/records/:_id/edit', (req, res) => {
  res.send('hello world!')
})

//刪除項目
app.post('/records/:_id/delete', (req, res) => {
  res.send('hello world!')
})



app.listen(3000, () => {
  console.log('App is running')
})