const { Unauthorized } = require('http-errors')

async function getCurrent(req, reply) {
  try {
    const { email, name } = req.user

    reply.code(200).send({
      status: 'success',
      code: 200,
      data: {
        email: email,
        name: name,
      },
      message: `Current user ${name}: ${email}`,
    })
  } catch (error) {
    throw new Unauthorized('Authorization failed')
  }
}

module.exports = getCurrent
