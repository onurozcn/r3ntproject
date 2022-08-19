const Review = require('../models/review')
const Product = require('../models/product')

exports.getAllReviews = async function (req, res, next) {
  try {
    const reviews = await Review.find({})
    res.send(reviews)
  }
  catch (e) {
    next(e)
  }
}

exports.getProductReview = async function (req, res,next) {
  try{
    const reviews = await Review.find({product : req.params.product_id})
    if (!reviews) {
      res.sendStatus(404)
      return
    }
      res.send(reviews)
  }
  catch (e) {
    next(e)
  }
}

exports.getReviewByUserId = async function (req, res, next) {
  try {
    const reviews = await Review.find({ user: req.params.user_id })
    if (!reviews) {
      res.sendStatus(404)
      return
    }
      res.send(reviews)
    }
  catch (e) {
    next(e)
  }
}

exports.createAReview = async function (req, res, next) {
  const { product, user, review } = req.body
  try{
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
  }
  catch (e) {
    next(e)
  }
}


exports.updateProductReview = async function (req, res, next) {
  try{
    const rev = await Review.findByIdAndUpdate(req.params.rev_id, {
      review: req.body.review,
    })
    res.send(rev)
  }
  catch (e) {
    next(e)
  }
}

exports.deleteAllReviews = async function (req, res, next) {
  try{
    await Review.deleteMany()
    res.sendStatus(200)
  }
  catch (e) {
    next(e)
  }
}

exports.deleteAReview = async function (req, res, next) {
    try{
      await Review.findByIdAndDelete(req.params.rev_id)
      res.sendStatus(200)
    }
    catch (e) {
      next(e)
    }
}

exports.getAllProducts = async function (req, res, next) {
  try{
    const products = await Product.find({})
    res.send(products)
  }
  catch (e) {
    next(e)
  }
}

exports.getProductById = async function (req, res, next) {
  try{
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.sendStatus(404)
      return
    }
    res.send(product)
  }
  catch (e) {
    next(e)
  }
}

exports.getCompanyProducts = async function (req, res, next) {
  try{
    const companyProducts = await Product.find({ owner : req.params.id })
    if (!companyProducts) {
      res.sendStatus(404)
      return
    }
    res.send(companyProducts)
  }
  catch (e) {
    next(e)
  }
}


exports.updateProduct = async function (req, res, next) {
  try{
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      // type: req.body.type,
      // classy: req.body.classy,
      gear: req.body.gear,
      seat: req.body.seat,
      fuel: req.body.fuel,
      amount: req.body.amount,
      price: req.body.price,
      // isAvailable: req.body.isAvailable,
      photo: req.body.photo,
      pickUpPoint: req.body.pickUpPoint,
    })
    res.send(product)
  }
  catch (e) {
    next(e)
  }
}

exports.createProduct = async function (req, res, next) {
  try{
    const {
      name,
      // type,
      // classy,
      gear,
      seat,
      fuel,
      amount,
      price,
      owner,
      // isAvailable,
      photo,
      pickUpPoint,
    } = req.body

    const product = await Product.create({
      name,
      // type,
      // classy,
      gear,
      seat,
      owner,
      fuel,
      amount,
      price,
      // isAvailable,
      photo,
      pickUpPoint,
    })
    res.send(product)
  }
  catch (e) {
    next(e)
  }
}

exports.deleteProductById = async function (req, res, next) {
  try{
    await Product.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  }
  catch (e) {
    next(e)
  }
}

exports.deleteAllProducts = async function (req, res, next) {
  try{
    await Product.deleteMany()
    res.sendStatus(200)
  }
  catch (e) {
    next(e)
  }
}

exports.getHomePage = (req, res, next) => {
  try{
    res.render('index', { title: 'RENTAL PROJECT' })
  }
  catch (e) {
    next(e)
  }
}