const Transaction = require('../../models/transaction')

async function addOne(req, reply) {
  const newTransaction = req.body

  const result = await Transaction.create(newTransaction)

  reply.code(201).send({
    status: 'success',
    code: 201,
    data: result,
    message: 'Transaction added',
  })
}

module.exports = addOne
