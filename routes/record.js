//load express templete
const express = require('express')

//call express middleware Router
const router = express.Router()

//load model Record
const Record = require('../models/record')

//rearrange routers
//列出全部項目
router.get('/', (req, res) => {
  return res.redirect('/')
})

//新增介面
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增
router.post('/', (req, res) => {
  const record = new Record({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount
  })
  // 存入資料庫
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })

})

//編輯介面
router.get('/:_id/edit', (req, res) => {
  Record.findById(req.params._id, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record: record })
  })
})

//編輯
router.put('/:_id', (req, res) => {
  Record.findById(req.params._id, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name
    record.date = req.body.date
    record.category = req.body.category
    record.amount = req.body.amount

    record.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/records`)
    })
  })
})

//刪除項目
router.delete('/:_id/delete', (req, res) => {
  Record.findById(req.params._id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router