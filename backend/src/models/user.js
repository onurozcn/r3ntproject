const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

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
  password: {
    type: String,
    trim: true,
    required: true
  }
})
  

class User {}
 
userSchema.loadClass(User)
userSchema.plugin(autopopulate)
//--------------------------------------------------------------------
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema)
