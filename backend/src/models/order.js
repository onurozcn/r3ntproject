const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const orderSchema = new mongoose.Schema({
  productId: {
    type: String,
    //   mongoose.Schema.Types.ObjectId,
    // ref: 'Product',
  },
  invoiceId: {
    type: String,
    //   mongoose.Schema.Types.ObjectId,
    // ref: 'Invoice',
  },
})

class Order {
  // constructor(product, invoice) {
  //   this.product = product
  //   this.invoice = invoice
  // }
}

orderSchema.loadClass(Order)
orderSchema.plugin(autopopulate)

module.exports = mongoose.model('Order', orderSchema)
