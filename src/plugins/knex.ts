import knex from 'knex'
import fp from 'fastify-plugin'

export default fp(
  function fastifyKnex(fastify, options, next) {
    if (!fastify.knex) {
      const connection = knex({
        client: 'pg',
        connection: {
          connectionString: fastify.config.DATABASE_URL,
        },
        ...(fastify.config.NODE_ENV === 'development' && { debug: true }),
        ...(options && { options }),
      })
      fastify.decorate('knex', connection)
    }
    next()
  },
  {
    name: 'knex',
  },
)
