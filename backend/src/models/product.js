const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // type: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // classy: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  gear: {
    type: String,
    required: true,
    trim: true,
  },
  seat: {
    type: Number,
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
  // isAvailable: Boolean,
  pickUpPoint: {
    type: String,
    trim: true,
  }, // for now it takes string, later on it should take a coordinate or location directly
  photo: {
    type: String,
    trim: true,
    required: true,
  },
  revs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    autopopulate: true,
  }]
})

class Product {
  async addRev(rev) {
    this.revs.push(rev)
    await this.save()
  }
}

productSchema.loadClass(Product)
productSchema.plugin(autopopulate)

module.exports = mongoose.model('Product', productSchema)
