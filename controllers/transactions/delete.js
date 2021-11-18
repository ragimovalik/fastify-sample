const { ObjectId } = require('mongodb')
const { NotFound, BadRequest } = require('http-errors')
const Transaction = require('../../models/transaction')

async function deleteById(req, reply) {
  const { id } = req.params
  const ownerId = req.user._id

  const transaction = await Transaction.deleteOne({
    owner: ownerId,
    _id: ObjectId(id),
  })
  // const transaction = await Transaction.findByIdAndDelete(id)

  if (transaction.deletedCount === 0 || !transaction)
    throw new NotFound(
      `Transaction with id ${id} by owner ${ownerId} not found`
    )

  reply.code(200).send({
    status: 'success',
    code: 200,
    data: transaction,
    message: `Transaction Id ${id} deleted`,
  })
}

module.exports = deleteById
