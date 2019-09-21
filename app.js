//load express
const express = require('express')
const app = express()

//load mongoose
const mongoose = require('mongoose')

//load express handlebars
const exphbs = require('express-handlebars')

//load body-parser
const bodyParser = require('body-parser')

//load mothodOverride
const methodOverride = require('method-override')

//set handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//set methodOverride
app.use(methodOverride('_method'))

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

//load router
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))



app.listen(3000, () => {
  console.log('App is running')
})