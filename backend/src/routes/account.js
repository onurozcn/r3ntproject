const express = require('express')
const passport = require('passport')

const User = require('../models/user')
const Company = require('../models/company')

const router = express.Router()

router.get('/company-session/session', (req, res) => {
  res.send(req.company)
})

router.post('/company-session', async (req, res, next) => {
  const { companyName, email, password } = req.body

  try {
    const company = await Company.companyRegister({ companyName, email }, password)
    res.send(company)
  } catch (e) {
    next(e)
  }
})

router.post('/company-session/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.company)
})

router.delete('/company-session/session', async (req, res, next) => {
  await req.companyLogout()

  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

router.get('/user-session/session', (req, res) => {
  res.send(req.user)
})

router.post('/user-session/session', async (req, res, next) => {
  const { name, age, email, password } = req.body

  try {
    const user = await User.register({ name, age, email }, password)
    res.send(user)
  } catch (e) {
    next(e)
  }
})

router.post('/user-session/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.user)
})

router.delete('/user-session/session', async (req, res, next) => {
  await req.logout()

  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

module.exports = router
