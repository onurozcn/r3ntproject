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
router.get('/user/:id/', async function (req, res) {
  const orders = await Order.find({ user: req.params.id })
  if (!orders) {
    res.sendStatus(404)
    return
  }
  console.log("USER ORDERS")
  console.log(orders)
  console.log('END')
  res.send(orders)
})

router.post('/', async function (req, res) {
  const { product, invoice, user } = req.body

  if (!product || !invoice || !user) {
    res
      .send({
        message: 'Missing parameters/fields.',
      })
      .status(400)
    return
  }
  const order = await Order.create({
    product,
    invoice,
    user,
  })
  res.send(order)
})

router.delete('/', async function (req, res) {
  await Order.deleteMany()
  res.sendStatus(200)
})

module.exports = router
