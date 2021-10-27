const { NotFound } = require('http-errors')
const { ObjectId } = require('mongodb')
const Transaction = require('../../models/transaction')

async function getById(req, reply) {
  const { id } = req.params

  const transaction = await Transaction.findById({ _id: ObjectId(id) })

  if (!transaction) throw new NotFound(`Transaction with Id ${id} not found`)

  reply.code(200).send({
    status: 'success',
    code: 200,
    data: transaction,
    message: `Transaction with Id ${id} collected`,
  })
}

module.exports = getById
