const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    res.render('index', { title: 'RENTAL PROJECT' })
  } catch (e) {
    next(e)
  }
})

module.exports = router
