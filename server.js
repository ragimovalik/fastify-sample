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

const { PORT, DB_HOST } = process.env

fastify.register(require('./routes/users'))
fastify.register(require('./routes/transactions'))

// fastify
//   .register((instance, opts, done) => {
//     console.log('Current plugin')
//     done()
//   })
//   .after((err) => {
//     console.log('After current plugin')
//   })
//   .register((instance, opts, done) => {
//     console.log('Next plugin')
//     done()
//   })
//   .after((err) => console.log('If smth went wrong'))
//   .ready((err) => {
//     console.log('Everything has been loaded')
//   })

fastify.get('/', (req, reply) => {
  reply.send({ welcome: 'If you see this message, everything goes well' })
})

const start = async () => {
  try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    fastify.log.info('Mongoose connected')

    await fastify.listen(PORT || 5000)
  } catch (error) {
    fastify.log.error(error.message)
    process.exit(1)
  }
}

start()
