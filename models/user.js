const { Schema, model } = require('mongoose')

const userSchema = Schema({
  name: {
    type: String,
  },
  email: { type: String },
  phone: {
    type: String,
  },
})

const User = model('User', userSchema)

module.exports = User
