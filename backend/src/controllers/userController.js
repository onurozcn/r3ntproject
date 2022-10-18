const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const User = require('../models/user')
const Order = require('../models/order')
const Invoice = require('../models/invoice')
const Product = require('../models/product')

const key = require('../config')

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: key.API_KEY,
    },
  })
)

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    next(e)
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.sendStatus(404)
      return
    }
    res.send(user)
  } catch (e) {
    next(e)
  }
}

exports.updateUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      isCompany: req.body.isCompany,
    })
    res.send(user)
  } catch (e) {
    next(e)
  }
}

exports.createUser = async (req, res) => {
  const { name, email, isCompany } = req.body

  if (!email || !name || !isCompany) {
    res
      .send({
        message: 'Missing fields.',
      })
      .status(400)
    return
  }
  const user = await User.create({
    name,
    email,
    isCompany,
  })
  res.send(user)
}

exports.deleteUserById = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}

exports.deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
    res.send(orders)
  } catch (e) {
    next(e)
  }
}

exports.getOrderById = async (req, res, next) => {
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
}

exports.getUserOrdersByUserId = async (req, res, next) => {
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
}

exports.createOrder = async (req, res, next) => {
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
}

exports.deleteAllOrders = async (req, res, next) => {
  try {
    await Order.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}

exports.getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find({})
    res.send(invoices)
  } catch (e) {
    next(e)
  }
}

exports.getInvoiceById = async (req, res, next) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.id })
    res.send(invoices)
  } catch (e) {
    next(e)
  }
}

exports.getUserInvoiceByInvoiceId = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
    res.send(invoice)
  } catch (e) {
    next(e)
  }
}

exports.createInvoice = async (req, res, next) => {
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
}

exports.getUserInvoicesByUserId = async (req, res, next) => {
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
}

exports.deleteAllInvoices = async (req, res, next) => {
  try {
    await Invoice.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}
