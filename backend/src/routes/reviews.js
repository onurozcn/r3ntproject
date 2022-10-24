const express = require('express')

const Review = require('../models/review')
const Product = require('../models/product')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find({})
    res.send(reviews)
  } catch (e) {
    next(e)
  }
})

router.get('/product/:product_id', async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.product_id })
    if (!reviews) {
      res.sendStatus(404)
      return
    }
    res.send(reviews)
  } catch (e) {
    next(e)
  }
})

router.get('/user/:user_id/', async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.params.user_id })
    if (!reviews) {
      res.sendStatus(404)
      return
    }
    res.send(reviews)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  const { product, user, review } = req.body
  try {
    if (!product || !user || !review) {
      res
        .send({
          message: 'Missing parameters/fields.',
        })
        .status(400)
      return
    }
    const rev = await Review.create({
      product,
      user,
      review,
    })
    // eslint-disable-next-line no-underscore-dangle
    const pr = await Product.findById(product._id)
    pr.revs.push(rev)
    pr.save()
    res.send(pr)
  } catch (e) {
    next(e)
  }
})

router.patch('/update-review/:rev_id', async (req, res, next) => {
  try {
    const rev = await Review.findByIdAndUpdate(req.params.rev_id, {
      review: req.body.review,
    })
    res.send(rev)
  } catch (e) {
    next(e)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await Review.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

router.delete('/:rev_id', async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.rev_id)
    const prods = await Product.find()
    res.send(prods)
  } catch (e) {
    next(e)
  }
})

module.exports = router
