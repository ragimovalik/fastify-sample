const User = require('../../models/user')

async function signout(req, reply) {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null })

    reply.code(200).send({
      status: 'success',
      code: 200,
      message: 'Signout success',
    })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = signout
