const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')

  Record.create({
    name: '午餐',
    category: 'eat',
    date: '2019/04/23',
    amount: 60
  })

  Record.create({
    name: '晚餐',
    category: 'eat',
    date: '2019/04/23',
    amount: 60
  })

  Record.create({
    name: '捷運',
    category: 'traffic',
    date: '2019/04/23',
    amount: 120
  })

  Record.create({
    name: '電影：驚奇隊長',
    category: 'entertainment',
    date: '2019/04/23',
    amount: 220
  })

  Record.create({
    name: '租金',
    category: 'live',
    date: '2019/04/01',
    amount: 25000
  })

  console.log('done')
})

