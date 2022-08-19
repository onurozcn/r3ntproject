const express = require('express')
const router = express.Router()

const usersController = require('../controllers/userController')

router.get('/', usersController.getAllOrders)

router.get('/:id', usersController.getOrderById)

router.get('/user/:id/', usersController.getUserOrdersByUserId)

router.post('/', usersController.createOrder )

router.delete('/', usersController.deleteAllOrders)

module.exports = router
