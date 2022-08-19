const express = require('express')
const router = express.Router()

const shopsController = require('../controllers/shopController')


router.get('/', shopsController.getAllReviews)

router.get('/product/:product_id', shopsController.getProductReview )

router.get('/user/:user_id/', shopsController.getReviewByUserId)

router.post('/', shopsController.createAReview)

router.patch('/update-review/:rev_id', shopsController.updateProductReview )

router.delete('/', shopsController.deleteAllReviews)

router.delete('/:rev_id', shopsController.deleteAReview)

module.exports = router
