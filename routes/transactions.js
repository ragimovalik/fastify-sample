const {
  addOne,
  getAll,
  getById,
  deleteById,
  updateById,
} = require('../controllers/transactions')

// Transaction schema
const transaction = {
  type: 'object',
  properties: {
    operationDate: { type: 'string' },
    isIncome: { type: 'boolean' },
    categoryIncoming: { type: 'string' },
    categorySpending: { type: 'string' },
    description: { type: 'string' },
    value: { type: 'string' },
    _id: { type: 'string' },
  },
}

// Params validation schema
const paramsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
}

// Options for add one transaction
const addOneOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        isIncome: { type: 'boolean' },
        description: { type: 'string', minLength: 2, maxLength: 20 },
        categoryIncoming: { type: 'string' },
        categorySpending: { type: 'string' },
        value: { type: 'number', minimum: 0.01 },
        operationDate: { type: 'string' },
      },
      required: ['isIncome', 'description', 'value'],
      oneOf: [
        { required: ['categorySpending'] },
        { required: ['categoryIncoming'] },
      ],
    },
    response: {
      201: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          code: { type: 'number' },
          data: transaction,
          message: { type: 'string' },
        },
      },
    },
  },
  handler: addOne,
}

// Options for get all transactions
const getAllOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          code: { type: 'number' },
          dataLenth: { type: 'number' },
          data: {
            type: 'array',
            items: transaction,
          },
          message: { type: 'string' },
        },
      },
    },
  },
  handler: getAll,
}

// Options for get one transaction by id
const getByIdOpts = {
  schema: {
    params: paramsSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          code: { type: 'number' },
          data: transaction,
          message: { type: 'string' },
        },
      },
    },
  },
  handler: getById,
}

// Options for delete one transaction by id
const deleteByIdOpts = {
  schema: {
    params: paramsSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          code: { type: 'number' },
          data: transaction,
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteById,
}

// Options for update one transaction by id
const updateByIdOpts = {
  schema: {
    params: paramsSchema,
    body: {
      type: 'object',
      properties: {
        isIncome: { type: 'boolean' },
        description: { type: 'string', minLength: 2, maxLength: 20 },
        categoryIncoming: { type: 'string' },
        categorySpending: { type: 'string' },
        value: { type: 'number', minimum: 0.01 },
        operationDate: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          code: { type: 'number' },
          data: transaction,
          message: { type: 'string' },
        },
      },
    },
  },
  handler: updateById,
}

// Routes
async function routes(fastify, opts, done) {
  fastify.post('/transactions', addOneOpts)
  fastify.get('/transactions', getAllOpts)
  fastify.get('/transactions/:id', getByIdOpts)
  fastify.delete('/transactions/:id', deleteByIdOpts)
  fastify.patch('/transactions/:id', updateByIdOpts)

  done()
}

module.exports = routes
