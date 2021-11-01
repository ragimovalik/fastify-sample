const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: 6,
    },

    name: {
      type: String,
      required: [true, 'Please set your name'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phone: {
      type: String,
      default: '+38 ',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)

// Method | hash password for signup
userSchema.methods.setPassword = function (password) {
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(password, salt)
}

// Method | compare password for signin
userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model('User', userSchema)

module.exports = User
