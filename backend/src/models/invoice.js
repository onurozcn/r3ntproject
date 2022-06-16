const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  productName: {
    type: String
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Product',
  },
  productPrice: {
    type : Number
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Product',
  },
})
class Invoice {}


 
invoiceSchema.loadClass(Invoice)
invoiceSchema.plugin(autopopulate)

module.exports = mongoose.model('Invoice', invoiceSchema)