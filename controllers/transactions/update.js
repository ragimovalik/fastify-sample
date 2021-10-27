const { NotFound } = require('http-errors')
const Transaction = require('../../models/transaction')

async function updateById(req, reply) {
  const { id } = req.params
  const dataToUpdate = req.body

  const transaction = await Transaction.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
  })

  if (!transaction) throw new NotFound('There is no contact with such Id')

  reply.code(200).send({
    status: 'success',
    code: 200,
    data: transaction,
    message: `Contact with id ${id} was successfully updated`,
  })
}

module.exports = updateById
