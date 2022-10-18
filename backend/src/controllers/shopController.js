const Review = require('../models/review')
const Product = require('../models/product')

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({})
    res.send(reviews)
  } catch (e) {
    next(e)
  }
}

exports.getProductReview = async (req, res, next) => {
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
}

exports.getReviewByUserId = async (req, res, next) => {
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
}

exports.createAReview = async (req, res, next) => {
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
}

exports.updateProductReview = async (req, res, next) => {
  try {
    const rev = await Review.findByIdAndUpdate(req.params.rev_id, {
      review: req.body.review,
    })
    res.send(rev)
  } catch (e) {
    next(e)
  }
}

exports.deleteAllReviews = async (req, res, next) => {
  try {
    await Review.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}

exports.deleteAReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.rev_id)
    const prods = await Product.find()
    res.send(prods)
  } catch (e) {
    next(e)
  }
}

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
    res.send(products)
  } catch (e) {
    next(e)
  }
}

exports.getProductById = async (req, res, next) => {
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
}

exports.getCompanyProducts = async (req, res, next) => {
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
}

exports.updateProduct = async (req, res, next) => {
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
}

exports.createProduct = async (req, res, next) => {
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
}

exports.deleteProductById = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}

exports.deleteAllProducts = async (req, res, next) => {
  try {
    await Product.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}

exports.getHomePage = (req, res, next) => {
  try {
    res.render('index', { title: 'RENTAL PROJECT' })
  } catch (e) {
    next(e)
  }
}

exports.filterBySpecs = async (req, res, next) => {
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
}
