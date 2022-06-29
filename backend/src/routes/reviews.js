/* eslint-disable func-names */
const express = require('express')

const router = express.Router()

const Review = require('../models/review')
const Product = require('../models/product')

router.get('/', async function (req, res) {
  const reviews = await Review.find({})

  res.send(reviews)
})

router.get('/product/:product_id', async function (req, res) {
  const reviews = await Review.find({product : req.params.product_id})

  if (!reviews) {
    res.sendStatus(404)
    return
  }
  res.send(reviews)
})

router.get('/user/:user_id/', async function (req, res) {
  const reviews = await Review.find({ user: req.params.user_id })
  if (!reviews) {
    res.sendStatus(404)
    return
  }
  res.send(reviews)
})

router.post('/', async function (req, res) {
  const { product, user, review } = req.body

  if (!product || !user || !review) {
    res
      .send({
        message: 'Missing parameters/fields.',
      })
      .status(400)
    return
  }
  const rev = await Review.create({
    product: product,
    user: user,
    review,
  })
// add this review to Product 
  
  const pr= await Product.findById(product._id)
  pr.revs.push(rev)
  pr.save()
  res.send(rev)
})

router.patch('/update-review/:rev_id', async function (req, res) {
  const rev = await Review.findByIdAndUpdate(req.params.rev_id, {
    review: req.body.review,
  })
  res.send(rev)
})

router.delete('/', async function (req, res) {
  await Review.deleteMany()
  res.sendStatus(200)
})

router.delete('/:rev_id', async function (req, res) {
    await Review.findByIdAndDelete(req.params.rev_id)
    res.sendStatus(200)
})

module.exports = router
