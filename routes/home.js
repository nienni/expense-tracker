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

      console.log(records)

      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      console.log(totalAmount)




      return res.render('index', { records: records, totalAmount: totalAmount })


    })
})



//export
module.exports = router