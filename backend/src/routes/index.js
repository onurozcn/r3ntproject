const express = require('express')
const router = express.Router()

const shopsController = require('../controllers/shopController')

/* GET home page. */
router.get('/', shopsController.getHomePage)


module.exports = router
