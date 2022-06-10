const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const invoiceSchema = new mongoose.Schema({
  userId: {
    type: String,
      // mongoose.Schema.Types.ObjectId,
      // ref: 'User',
  },
  productName: {
      type: String,
      // ref: 'Product',
  },
  productPrice: {
      type: Number,
      // ref: 'Product',
  },
})
class Invoice {
  // constructor(product, user) {
  //   this.userId = user.id
  //   this.productName = product.name
  //   this.productPrice = product.price
  // }
}


 
invoiceSchema.loadClass(Invoice)
invoiceSchema.plugin(autopopulate)

module.exports = mongoose.model('Invoice', invoiceSchema)