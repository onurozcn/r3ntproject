const express = require('express')
const Order = require('../models/order')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find({})
    res.send(orders)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      res.sendStatus(404)
      return
    }
    res.send(order)
  } catch (e) {
    next(e)
  }
})

router.get('/user/:id/', async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.params.id })
    if (!orders) {
      res.sendStatus(404)
      return
    }
    res.send(orders)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  const { product, invoice, user } = req.body

  try {
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
  } catch (e) {
    next(e)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await Order.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

module.exports = router
