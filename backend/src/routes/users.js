const express = require('express')
const router = express.Router()

const usersController = require('../controllers/userController');


router.get('/', usersController.getAllUsers)

router.get('/:id/json', usersController.getUserById)

router.patch('/:id', usersController.updateUserById)

router.post('/', usersController.createUser)

router.delete('/deleteUserById/:id', usersController.deleteUserById)

router.delete('/deleteAllUsers', usersController.deleteAllUsers)

module.exports = router
