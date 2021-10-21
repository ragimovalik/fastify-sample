// const items = require('../Items')
const items = require('../db/db.json')
const {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
} = require('../controllers/items')

// Item schema
const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    age: { type: 'integer' },
    city: { type: 'string' },
  },
}

// Options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      },
    },
  },
  handler: getItems,
}

// Options for get single item
const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem,
}

// Options for addin item
const postItemOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'city', 'age'],
      properties: {
        name: { type: 'string' },
        age: { type: 'integer' },
        city: { type: 'string' },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
}

// Options for remove item
const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteItem,
}

// Options for update item
const updateItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: updateItem,
}

function itemRoutes(fastify, options, done) {
  // Get all items
  fastify.get('/items', getItemsOpts)

  // Get single item
  fastify.get('/items/:id', getItemOpts)

  // Add item
  fastify.post('/items', postItemOpts)

  // Delete item
  fastify.delete('/items/:id', deleteItemOpts)

  // Update item
  fastify.put('/items/:id', updateItemOpts)

  done()
}

module.exports = itemRoutes
