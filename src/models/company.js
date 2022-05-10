const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  companyName: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    require: true,
    trim: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
})

class Company {
  async addProduct(prod) {
    this.products.push(prod)
    await this.save()
  }
}

companySchema.loadClass(Company)
companySchema.plugin(autopopulate)

module.exports = mongoose.model('Company', companySchema)
