const {
  getUsers,
  getOneUser,
  addUser,
  updateUser,
  // deleteUser,
} = require('../controllers/users')

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
  },
}

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        users: User,
      },
    },
  },
  handler: getUsers,
}

const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getOneUser,
}

const addUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email', 'phone'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
      },
    },
    response: {
      201: User,
    },
  },
  handler: addUser,
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
    },
  },
  handler: updateUser,
}

async function routes(fastify, opts, done) {
  fastify.get('/users', getUsersOpts)
  fastify.get('/users/:id', getUserOpts)
  fastify.post('/users', addUserOpts)
  fastify.put('/users/:id', updateUserOpts)
  // fastify.delete('/users/:id', deleteUserOpts)

  done()
}

module.exports = routes
