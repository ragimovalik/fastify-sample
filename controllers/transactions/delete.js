const { ObjectId } = require('mongodb')
const { NotFound } = require('http-errors')
const Transaction = require('../../models/transaction')

async function deleteById(req, reply) {
  const { id } = req.params

  const transaction = await Transaction.findByIdAndDelete({ _id: ObjectId(id) })

  if (!transaction) throw new NotFound(`Transaction with Id ${id} not found`)

  reply.code(200).send({
    status: 'success',
    code: 200,
    data: transaction,
    message: `Transaction Id ${id} deleted`,
  })
}

module.exports = deleteById
