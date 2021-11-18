const { fastify } = require('fastify')
const {
  getCurrent,
  signup,
  signin,
  signout,
  updateUser,
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
        name: { type: 'string', minLength: 2, maxLength: 15 },
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

const getCurrentUserOpts = {
  schema: {
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
            },
          },
          message: { type: 'string' },
        },
      },
    },
  },
  preHandler: require('../plugins/isAuth'),
  handler: getCurrent,
}

const signoutOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          code: { type: 'number' },
          message: { type: 'string' },
        },
      },
    },
  },
  preHandler: require('../plugins/isAuth'),
  handler: signout,
}

const updateUserOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
      },
      anyOf: [
        { required: ['name'] },
        { required: ['email'] },
        { required: ['phone'] },
      ],
    },
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          code: { type: 'string' },
          data: User,
          message: { type: 'string' },
        },
      },
    },
  },
  preHandler: require('../plugins/isAuth'),
  handler: updateUser,
}

async function routes(fastify, opts, done) {
  fastify.post('/users', signupOpts)
  fastify.post('/users/signin', signinOpts)
  fastify.get('/users/current', getCurrentUserOpts)
  fastify.get('/users/signout', signoutOpts)
  fastify.put('/users/:id', updateUserOpts)

  done()
}

module.exports = routes
