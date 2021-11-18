const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
require('dotenv').config()

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
})

fastify.register(require('fastify-cors'))

const { PORT, DB_HOST } = process.env

fastify.register(require('./routes/users'))
fastify.register(require('./routes/transactions'))

const start = async () => {
  try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    fastify.log.info('Mongoose connected')

    await fastify.listen(PORT || 5000, () => console.log(`Port ${PORT} used`))
  } catch (error) {
    fastify.log.error(error.message)
    process.exit(1)
  }
}

// fastify.get('/', (req, reply) => {
//   reply.send({ welcome: 'If you see this message, everything goes well' })
// })

start()
