const signup = require('./signup')
const signin = require('./signin')

module.exports = { signup, signin }

/*

const { ObjectId } = require('mongodb')

async function getUsers(req, reply) {
  const users = this.mongo.db.collection('users')
  const result = await users.find({}).toArray()
  console.log(result)
  reply.send(result)
}

async function getOneUser(req, reply) {
  const { id } = req.params
  const users = this.mongo.db.collection('users')

  const user = await users.findOne({ _id: ObjectId(id) })

  if (user) {
    return reply.send(user)
  }
  reply.code(500).send({ message: 'Not found' })
}

async function addUser(req, reply) {
  const users = this.mongo.db.collection('users')
  const data = { ...req.body }
  const result = await users.insertOne(data)
  reply.code(201).send(result)
}

async function updateUser(req, reply) {
  const { id } = req.params
  const users = this.mongo.db.collection('users')

  await users.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: req.body },
    {
      upsert: true,
    }
  )

  reply.send({ message: 'Done' })
}
*/
