const { v4: uuidv4 } = require('uuid')
const itemsPath = require('../helpers/itemsPath')
const fileReading = require('../helpers/fileReading')

let items = require('../db/db.json')

const getItems = (req, reply) => {
  reply.send(items)
}

const getItem = (req, reply) => {
  const { id } = req.params

  const item = items.find((item) => item.id === id)

  reply.send(item)
}

const addItem = (req, reply) => {
  // const { name, age, city } = req.body
  const item = {
    id: uuidv4(),
    ...req.body,
  }

  items = [item, ...items]

  reply.code(201).send(item)
}

const deleteItem = (req, reply) => {
  const { id } = req.params

  items.filter((item) => item.id !== id)

  reply.send({ message: `Item ${id} has been removed` })
}

const updateItem = (req, reply) => {
  const { id } = req.params
  const { name } = req.body

  items = items.map((item) => (item.id === id ? { id, name } : item))

  item = items.find((item) => item.id === id)

  reply.send(item)
}

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
}
