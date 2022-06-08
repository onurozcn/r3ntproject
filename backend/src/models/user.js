const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')
const eventBus = require('./event-bus')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    trim: true
  },
  // password: {
  //   type: String,
  //   trim: true,
  //   required: true
  // }
})
  

class User {
  
  constructor() {
    eventBus.on('payment successful', (product, payment) => {
      this.balance -= payment
    })

    eventBus.on('order created', order => {
      this.orders.push(order)
    })
  }

  buy(product) {
    eventBus.emit('buying started')
    eventBus.emit('pay', product)
    eventBus.emit('buying finished')
  }

  // addBalance(amount) {
  //   this.balance += amount
  // }
}

  // rent(product) {
      
  // }

  // previousRents() {
  // list the previous loans
  // }

  // makeAreview(product){
  // }




 
userSchema.loadClass(User)
userSchema.plugin(autopopulate)
//--------------------------------------------------------------------
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema)
