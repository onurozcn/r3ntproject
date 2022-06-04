const express = require('express')

const router = express.Router()

const Product = require('../models/product')

router.get('/', async function (req, res, next) {
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

// router.patch('/:id', async function (req, res) {
//   const user = await User.findByIdAndUpdate(req.params.id, {
//     name: req.body.name,
//     age: req.body.age,
//     email: req.body.email,
//   })
//   res.send(user)
// })

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
    //   owner,
    isAvailable,
    pickUpPoint,
  } = req.body

  // if (!email || !name || !age) {
  //   res
  //     .send({
  //       message: 'Missing fields.',
  //     })
  //     .status(400)
  //   return
  // }

  const product = await Product.create({
    name,
    type,
    classy,
    gear,
    seat,
    // owner,
    fuel,
    amount,
    price,
    isAvailable,
    pickUpPoint,
  })

  res.send(product)
})

// router.delete('/:id', async function (req, res) {
//   await User.findByIdAndDelete(req.params.id)

//   res.sendStatus(200)
// })

module.exports = router
