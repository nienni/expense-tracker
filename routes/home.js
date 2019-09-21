//load express templete
const express = require('express')

//use middleware Router
const router = express.Router()

//use model Record
const Record = require('../models/record')

//set home page router
//首頁
router.get('/', (req, res) => {
  Record.find()
    .sort({ date: 'desc' })
    .exec((err, records) => {
      if (err) return console.error(err)
      return res.render('index', { records: records })
    })

})

//export
module.exports = router