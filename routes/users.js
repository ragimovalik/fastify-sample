const {
  // getCurrentUser,
  signup,
  signin,
  // signout,
  // updateUser,
} = require('../controllers/users')

const User = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    // password: { type: 'string' },
  },
}

const signupOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        password: { type: 'string', minLength: 6 },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          code: { type: 'number' },
          data: User,
          message: { type: 'string' },
        },
      },
    },
  },
  handler: signup,
}

const signinOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          code: { type: 'number' },
          data: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              token: { type: 'string' },
            },
          },
          message: { type: 'string' },
        },
      },
    },
  },
  handler: signin,
}

async function routes(fastify, opts, done) {
  fastify.post('/users', signupOpts)
  fastify.post('/users/signin', signinOpts)
  // fastify.get('/users', getCurrentUser)
  // fastify.put('/users/:id', updateUser)
  // fastify.delete('/users/:id', deleteUserOpts)

  done()
}

module.exports = routes
