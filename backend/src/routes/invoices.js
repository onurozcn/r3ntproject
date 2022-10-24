const express = require('express')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const Order = require('../models/order')
const Invoice = require('../models/invoice')
const User = require('../models/user')
const Product = require('../models/product')

const router = express.Router()

const key = require('../config')

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: key.API_KEY,
    },
  })
)

router.get('/', async (req, res, next) => {
  try {
    const invoices = await Invoice.find({})
    res.send(invoices)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.id })
    res.send(invoices)
  } catch (e) {
    next(e)
  }
})

router.get('/user-invoice/:id', async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
    res.send(invoice)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  const { user, product } = req.body
  try {
    if (!user || !product) {
      res
        .send({
          message: 'Missing fields.',
        })
        .status(400)
      return
    }

    await Product.findByIdAndUpdate(product, {
      amount: product.amount - 1,
    }).then(() => {
      if (product.amount === 0) {
        product.isAvailable = false
      }
    })

    const invoice = await Invoice.create({
      user,
      productName: product.name,
      productPrice: product.price,
    })
    await Order.create({
      product,
      invoice,
      user,
    })
    const usr = await User.findById(user)
    res.send(invoice)
    transporter.sendMail({
      to: usr.email,
      from: key.postMail,
      subject: 'Rent operation successfull!',
      html: `<h1> Dear ${usr.name}, we have recieved your payment. Your order has created. You can find your invoice on "Orders&Invoices" section</h1>`,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/user/:id/', async (req, res, next) => {
  try {
    const invoices = await Invoice.find({ user: req.params.id })
    if (!invoices) {
      res.sendStatus(404)
      return
    }
    res.send(invoices)
  } catch (e) {
    next(e)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await Invoice.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

module.exports = router
