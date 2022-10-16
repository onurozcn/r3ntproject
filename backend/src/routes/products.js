const express = require('express')

const router = express.Router()

const shopsController = require('../controllers/shopController')

router.get('/', shopsController.getAllProducts)

router.get('/:id', shopsController.getProductById)

router.get('/company/:id', shopsController.getCompanyProducts)

router.patch('/update/:id', shopsController.updateProduct)

router.post('/', shopsController.createProduct)

router.delete('/:id', shopsController.deleteProductById)

router.delete('/', shopsController.deleteAllProducts)

router.post('/filter', shopsController.filterBySpecs)

module.exports = router
