const express = require('express')

const router = express.Router()

const Company = require('../models/company')

router.get('/', async function (req, res) {
  const company = await Company.find({})

  res.send(company)
})

router.post('/', async function (req, res) {
  const { companyName, email, password } = req.body

  if (!email || !companyName || !password) {
    res
      .send({
        message: 'Missing fields.',
      })
      .status(400)
    return
  }

  const company = await Company.create({
    companyName,
    email,
    password,
  })

  res.send(company)
})

router.delete('/', async function(req, res){
  await Company.deleteMany()
  res.sendStatus(200)
})
module.exports = router
