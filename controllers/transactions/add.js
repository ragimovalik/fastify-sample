const { Conflict } = require('http-errors')
const Transaction = require('../../models/transaction')

async function addOne(req, reply) {
  console.log(req.user)

  try {
    const newTransaction = { ...req.body, owner: req.user._id }

    const result = await Transaction.create(newTransaction)

    reply.code(201).send({
      status: 'success',
      code: 201,
      data: result,
      message: 'Transaction added',
    })
  } catch (error) {
    throw new Conflict(error.message)
  }
}

module.exports = addOne
