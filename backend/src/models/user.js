const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
    trim: true,
  },
  isCompany: {
    type: Boolean,
  },
})
  

class User {
  
  // buy(product) {
   
  // }
  

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

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema)
