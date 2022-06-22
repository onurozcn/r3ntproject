const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  review: {
    type : String,
  },
})
class Review {}


 
reviewSchema.loadClass(Review)
reviewSchema.plugin(autopopulate)

module.exports = mongoose.model('Review', reviewSchema)