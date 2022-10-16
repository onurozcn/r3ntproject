const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  gear: {
    type: String,
    required: true,
    trim: true,
  },
  fuel: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  amount: {
    type: Number,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  pickUpPoint: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
    required: true,
  },
  revs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      autopopulate: true,
    },
  ],
})

productSchema.plugin(autopopulate)

module.exports = mongoose.model('Product', productSchema)
