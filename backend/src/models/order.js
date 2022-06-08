const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
  },
})

class Order{
  constructor(product, invoice) {
    this.product = product
    this.invoice = invoice
  }
}


orderSchema.loadClass(Order)
orderSchema.plugin(autopopulate)

module.exports = mongoose.model('Order', orderSchema)

