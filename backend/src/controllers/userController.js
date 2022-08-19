
const User = require('../models/user')
const Order = require('../models/order')
const Invoice = require('../models/invoice')
const Product = require('../models/product')

exports.getAllUsers = async function (req, res, next) {
  try{
    const users = await User.find({})
    res.send(users)
  }
  catch (e) {
    next(e)
  }  
}

exports.getUserById = async function (req, res, next) {
  try{
    const user = await User.findById(req.params.id)
    if (!user) {
      res.sendStatus(404)
      return
    }
    res.send(user)
  }
  catch (e) {
    next(e)
  }
}

exports.updateUserById = async function (req, res, next) {
  try{
    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      isCompany: req.body.isCompany,
    })
    res.send(user)
  }
  catch (e) {
    next(e)
  }
}

exports.createUser = async function (req, res, next) {
  const { name, email, age, isCompany} = req.body
  try{
    if (!email || !name || !age || !isCompany) {
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
      age,
      isCompany,
    })
    res.send(user)
  }
  catch (e) {
    next(e)
  }
}

exports.deleteUserById = async function (req, res, next) {
  try{
    await User.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  }
  catch (e) {
    next(e)
  }
}

exports.deleteAllUsers =async function (req, res, next) {
  try{
    await User.deleteMany()
    res.sendStatus(200)
  }
  catch (e) {
    next(e)
  }
}

exports.getAllOrders = async function (req, res, next) {
  try{
    const orders = await Order.find({})
    res.send(orders)
  }
  catch (e) {
    next(e)
  }
}

exports.getOrderById = async function (req, res, next) {
  try{
    const order = await Order.findById(req.params.id)
    if (!order) {
      res.sendStatus(404)
      return
    }
    res.send(order)
  }
  catch (e) {
    next(e)
  }
}

exports.getUserOrdersByUserId = async function (req, res, next) {
  try{
    const orders = await Order.find({ user: req.params.id })
    if (!orders) {
      res.sendStatus(404)
      return
    }
    res.send(orders)
  }
  catch (e) {
    next(e)
  }
}

exports.createOrder = async function (req, res, next) {
  const { product, invoice, user } = req.body

  try{
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
  }
  catch (e) {
    next(e)
  }
}

exports.deleteAllOrders = async function (req, res, next) {
  try{
    await Order.deleteMany()
    res.sendStatus(200)
  }
  catch (e) {
    next(e)
  }
}

exports.getAllInvoices = async function (req, res, next) {
  try{
    const invoices = await Invoice.find({})
    res.send(invoices)
  }
  catch (e) {
    next(e)
  }
}

exports.getInvoiceById = async function (req, res, next) {
  try{
    const invoices = await Invoice.find({ userId: req.user.id })
    res.send(invoices)
  }
  catch (e) {
    next(e)
  }
}

exports.getUserInvoiceByInvoiceId = async function (req, res, next) {
  try{
    const invoice = await Invoice.findById(req.params.id)
    res.send(invoice)
  }
  catch (e) {
    next(e)
  }
}

exports.createInvoice = async function (req, res, next) {
  const { user, product } = req.body
  try{
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
    const order = await Order.create({
      product,
      invoice,
      user,
    })
  await Product.findByIdAndUpdate(product, {
      amount: product.amount-1
    })
    res.send(invoice)
  }
  catch (e) {
    next(e)
  }
}

exports.getUserInvoicesByUserId = async function (req, res, next) {
  try {
    const invoices = await Invoice.find({ user: req.params.id })
    if (!invoices) {
      res.sendStatus(404)
      return
    }
    res.send(invoices)
  }
  catch (e) {
    next(e)
  }
}

exports.deleteAllInvoices = async function (req, res, next) {
  try {
    await Invoice.deleteMany()
    res.sendStatus(200)
  }
  catch (e) {
    next(e)
  }
}