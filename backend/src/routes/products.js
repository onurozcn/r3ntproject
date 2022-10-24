const express = require('express')
const Product = require('../models/product')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({})
    res.send(products)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.sendStatus(404)
      return
    }
    res.send(product)
  } catch (e) {
    next(e)
  }
})

router.get('/company/:id', async (req, res, next) => {
  try {
    const companyProducts = await Product.find({ owner: req.params.id })
    if (!companyProducts) {
      res.sendStatus(404)
      return
    }
    res.send(companyProducts)
  } catch (e) {
    next(e)
  }
})

router.patch('/update/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      gear: req.body.gear,
      fuel: req.body.fuel,
      amount: req.body.amount,
      price: req.body.price,
      photo: req.body.photo,
      pickUpPoint: req.body.pickUpPoint,
    })
    res.send(product)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, gear, fuel, amount, price, owner, photo, pickUpPoint } = req.body

    const product = await Product.create({
      name,
      gear,
      owner,
      fuel,
      amount,
      price,
      photo,
      pickUpPoint,
    })
    res.send(product)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await Product.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

router.post('/filter', async (req, res, next) => {
  try {
    const { price, fuel, gear } = req.body
    const query = []

    if (price) {
      query.push({
        price: {
          $lte: Number(price),
        },
      })
    }
    if (fuel) {
      query.push({
        fuel,
      })
    }
    if (gear) {
      query.push({
        gear,
      })
    }
    if (query.length > 0) {
      const result = await Product.aggregate([
        {
          $match: {
            $and: query,
          },
        },
        {
          $sort: { price: 1 },
        },
      ])
      res.send(result)
    } else res.send(await Product.find({}))
  } catch (e) {
    next(e)
  }
})

module.exports = router
