/* eslint-disable func-names */
const express = require('express')

const router = express.Router()

const Invoice = require('../models/invoice')

router.get('/', async function (req, res) {
  const invoices = await Invoice.find({})
  res.send(invoices)
})

router.get('/:id', async function (req, res) {
  const invoices = await Invoice.find({ userId: req.user.id })
  res.send(invoices)
})

router.post('/', async function (req, res) {
  const { userId, productName, productPrice } = req.body
  if (!userId || !productName || !productPrice) {
    res
      .send({
        message: 'Missing fields.',
      })
      .status(400)
    return
  }

  const invoice = await Invoice.create({
    userId,
    productName,
    productPrice,
  })

  res.send(invoice)
})

module.exports = router
