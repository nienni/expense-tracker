//load express templete
const express = require('express')

//use middleware Router
const router = express.Router()

//use model Record
const Record = require('../models/record')

//load auth middleware authenticated method
const { authenticated } = require('../config/auth')

//set home page router
//首頁
router.get('/', authenticated, (req, res) => {
  Record.find()
    .sort({ date: 'desc' })
    .exec((err, records) => {
      if (err) return console.error(err)

      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }

      return res.render('index', { records: records, totalAmount: totalAmount })

    })
})



//export
module.exports = router