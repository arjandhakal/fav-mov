import fp from 'fastify-plugin'

export default fp(
  async function authAutoHooks(fastify, opts) {
    fastify.decorate('usersDataSource', {
      findUser: async (email: string) => {
        const user = await fastify.knex
          .select('*')
          .from('users')
          .where('email', email)
        if (!user || user.length === 0) {
          return null
        }
        return user[0]
      },
    })
  },
  {
    encapsulate: true,
  },
)
