const express = require('express')
const passport = require('passport')

const router = express.Router()

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const User = require('../models/user')
const key = require('../config')

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: key.API_KEY,
    },
  })
)

router.get('/session', (req, res) => {
  res.send(req.user)
})

router.post('/', async (req, res, next) => {
  const { name, email, password, isCompany } = req.body

  try {
    const user = await User.register({ name, email, isCompany }, password)
    res.send(user)
    transporter.sendMail({
      to: email,
      from: key.postMail,
      subject: 'Sign-up succeeded to R3ntals',
      html: `<h1> Thank you ${name}, you are successfully registered</h1>`,
    })
  } catch (e) {
    next(e)
  }
})

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.user)
})

router.delete('/session', async (req, res, next) => {
  await req.logout()

  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

module.exports = router
