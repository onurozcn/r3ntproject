const express = require('express')
const router = express.Router()

const usersController = require('../controllers/userController')

router.get('/', usersController.getAllInvoices)

router.get('/:id', usersController.getInvoiceById)

router.get('/user-invoice/:id', usersController.getUserInvoiceByInvoiceId)

router.post('/', usersController.createInvoice)

router.get('/user/:id/', usersController.getUserInvoicesByUserId)

router.delete('/', usersController.deleteAllInvoices)

module.exports = router
