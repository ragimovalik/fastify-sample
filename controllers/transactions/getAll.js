const Transaction = require('../../models/transaction')

async function getAll(req, reply) {
  const transactions = await Transaction.find({})

  reply.code(200).send({
    status: 'success',
    code: 200,
    dataLenth: transactions.length,
    data: transactions,
    message: 'Transactions from DB successfully collected',
  })
}

module.exports = getAll
