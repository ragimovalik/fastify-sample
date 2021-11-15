const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const User = require('../models/user')

const { SECRET_KEY } = process.env

async function isAuth(req, reply) {
  if (!req.headers.authorization) {
    throw new Unauthorized('No token was sent')
  }

  const [bearer, token] = req.headers.authorization.split(' ')

  if (bearer !== 'Bearer') {
    throw new Unauthorized('No Bearer token was sent')
  }
  jwt.verify(token, SECRET_KEY)

  const user = await User.findOne({ token })

  if (!user) {
    throw new Unauthorized('Authentication failed!')
  }

  req.user = user
}

module.exports = isAuth
