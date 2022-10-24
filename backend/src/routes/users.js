const express = require('express')

const router = express.Router()

const User = require('../models/user')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    next(e)
  }
})

router.get('/:id/json', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.sendStatus(404)
      return
    }
    res.send(user)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      isCompany: req.body.isCompany,
    })
    res.send(user)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res) => {
  const { name, email, isCompany } = req.body

  if (!email || !name || !isCompany) {
    res
      .send({
        message: 'Missing fields.',
      })
      .status(400)
    return
  }
  const user = await User.create({
    name,
    email,
    isCompany,
  })
  res.send(user)
})

router.delete('/deleteUserById/:id', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

router.delete('/deleteAllUsers', async (req, res, next) => {
  try {
    await User.deleteMany()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

module.exports = router
