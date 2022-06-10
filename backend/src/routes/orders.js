/* eslint-disable func-names */
const express = require('express')

const router = express.Router()

const Order = require('../models/order')

router.get('/', async function (req, res) {
  const orders = await Order.find({})

  res.send(orders)
})

router.get('/:id', async function (req, res) {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.sendStatus(404)
    return
  }
  res.send(order)
})

router.post('/', async function (req, res) {
  const { productId, invoiceId } = req.body

  if (!productId || !invoiceId) {
    res
      .send({
        message: 'Missing parameters/fields.',
      })
      .status(400)
    return
  }
  const order = await Order.create({
    productId,
    invoiceId,
  })
  res.send(order)
})

module.exports = router
