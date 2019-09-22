//load express
const express = require('express')
const app = express()

//judge development environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//load mongoose
const mongoose = require('mongoose')

//load express handlebars
const exphbs = require('express-handlebars')

//load body-parser
const bodyParser = require('body-parser')

//load mothodOverride
const methodOverride = require('method-override')

//load express-session
const session = require('express-session')

//load passport
const passport = require('passport')

//set handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//set methodOverride
app.use(methodOverride('_method'))

//set session
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))

//set passport
app.use(passport.initialize())
app.use(passport.session())

//load passprt config
require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

//set mongoose and useNewURLParser以及不知為何出現叫我裝 { useUnifiedTopology: true }的warning
mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

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
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))



app.listen(3000, () => {
  console.log('App is running')
})