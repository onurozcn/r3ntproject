/* eslint-disable func-names */
const express = require('express')

const router = express.Router()

const Invoice = require('../models/invoice')
const Order = require('../models/order')
// const Product = require('../models/product')

router.get('/', async function (req, res) {
  const invoices = await Invoice.find({})
  res.send(invoices)
})

router.get('/:id', async function (req, res) {
  const invoices = await Invoice.find({ userId: req.user.id })
  res.send(invoices)
})

router.post('/', async function (req, res) {
  console.log(req.body)
  const { user, product } = req.body
  if (!user || !product) {
    res
      .send({
        message: 'Missing fields.',
      })
      .status(400)
    return
  }

  const invoice = await Invoice.create({
    user,
    productName: product.name,
    productPrice: product.price,
  })
  console.log('INVOICE CREATED')
  // eslint-disable-next-line no-unused-vars

  const order = await Order.create({
    product,
    invoice,
    user,
  })
  
  // Product.setAmount(product)
  // console.log(product)
  console.log('ORDER CREATED')

  res.send(invoice)
})
router.get('/user/:id/', async function (req, res) {
  const invoices = await Invoice.find({ user: req.params.id })
  if (!invoices) {
    res.sendStatus(404)
    return
  }
  console.log('USER ORDERS')
  console.log(invoices)
  console.log('END')
  res.send(invoices)
})

router.delete('/', async function (req, res) {
  await Invoice.deleteMany()
  res.sendStatus(200)
})

module.exports = router
