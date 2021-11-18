const { BadRequest } = require('http-errors')
const { ObjectId } = require('mongodb')
const User = require('../../models/user')

async function updateUser(req, reply) {
  try {
    const { id } = req.params
    const dataForUpd = { ...req.body }
    await User.findByIdAndUpdate({ _id: ObjectId(id) }, dataForUpd)

    const updatedUser = await User.findById({ _id: ObjectId(id) })

    reply.code(200).send({
      status: 'success',
      code: 200,
      data: updatedUser,
      message: `Data for user with ${id} updated`,
    })
  } catch (error) {
    throw new BadRequest('Check you request and try again later')
  }
}

module.exports = updateUser
