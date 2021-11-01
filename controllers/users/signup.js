const { Conflict } = require('http-errors')
const User = require('../../models/user')

async function signup(req, reply) {
  const { name, password, email, phone = '' } = req.body

  const user = await User.findOne({ email })
  if (user) throw new Conflict('User already exist')

  const newUser = new User({
    email,
    phone,
    name,
  })

  newUser.setPassword(password)

  await newUser.save()

  reply.code(201).send({
    status: 'success',
    code: 201,
    data: {
      email: newUser.email,
      name: newUser.name,
    },
    message: `New user ${newUser.email} joined`,
  })
}

module.exports = signup
