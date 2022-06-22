/* eslint-disable func-names */
const express = require('express')

const router = express.Router()

const Product = require('../models/product')
// const User = require('../models/user')

router.get('/', async function (req, res) {
  const products = await Product.find({})

  res.send(products)
})

router.get('/:id', async function (req, res) {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.sendStatus(404)
    return
  }

  res.send(product)
})
// ??????????????????????????????
router.get('/company/:id', async function (req, res) {
  // console.log(req.params.id)
  // const user = await User.findById(req.params.id)
  const companyProducts = await Product.find({ owner : req.params.id })
  if (!companyProducts) {
    res.sendStatus(404)
    return
  }
  console.log('COMPANY')
  console.log(companyProducts)
  res.send(companyProducts)
})
// filter product by selection ?????????????????
router.get('/filter', async (req, res) => {
  const {fPrice} = req.body
  const product = await Product.find({ price: { $lt: fPrice } })
  console.log(product)
  res.send(product)
})

router.patch('/update/:id', async function (req, res) {
  // console.log('PATCH PRODUCTS')
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    type: req.body.type,
    classy: req.body.classy,
    gear: req.body.gear,
    seat: req.body.seat,
    fuel: req.body.fuel,
    amount: req.body.amount,
    price: req.body.price,
    // owner: req.params.owner,
    isAvailable: req.body.isAvailable,
    pickUpPoint: req.body.pickUpPoint,
  })
  // console.log("PATCH")
  // console.log(product)
  res.send(product)
})

router.post('/', async function (req, res) {
  const {
    name,
    type,
    classy,
    gear,
    seat,
    fuel,
    amount,
    price,
    owner,
    isAvailable,
    pickUpPoint,
  } = req.body


  const product = await Product.create({
    name,
    type,
    classy,
    gear,
    seat,
    owner,
    fuel,
    amount,
    price,
    isAvailable,
    pickUpPoint,
  })

  res.send(product)
})

router.delete('/:id', async function (req, res) {
  await Product.findByIdAndDelete(req.params.id)

  res.sendStatus(200)
})
router.delete('/', async function (req,res){
  await Product.deleteMany()
  res.sendStatus(200)
})

module.exports = router
