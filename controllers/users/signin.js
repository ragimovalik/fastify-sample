const { BadRequest } = require('http-errors')
const User = require('../../models/user')

const jwt = require('jsonwebtoken')

async function signin(req, reply) {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user || !user.comparePasswords(password)) {
    throw new BadRequest('Wrong email or password')
  }

  const payload = { id: user._id }

  const { SECRET_KEY } = process.env

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '72h',
  })

  await User.findByIdAndUpdate(user._id, { token })

  reply.code(200).send({
    status: 'success',
    code: 200,
    data: {
      email: user.email,
      token: token,
    },
    message: `${user.email} signin success`,
  })
}

module.exports = signin
