/* eslint-disable func-names */
const express = require('express')

const router = express.Router()

const User = require('../models/user')

router.get('/', async function (req, res) {
  const users = await User.find({})

  res.send(users)
})

router.get('/:id/json', async function (req, res) {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.sendStatus(404)
    return
  }

  res.send(user)
})

router.patch('/:id', async function (req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    isCompany: req.body.isCompany,
  })
  res.send(user)
})

router.post('/', async function (req, res) {
  const { name, email, age, isCompany} = req.body

  if (!email || !name || !age || !isCompany) {
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
    age,
    isCompany,
  })

  res.send(user)
})

router.delete('/:id', async function (req, res) {
  await User.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})
router.delete('/', async function (req, res) {
  await User.deleteMany()
  res.sendStatus(200)
})
module.exports = router
