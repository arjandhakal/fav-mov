import fp from 'fastify-plugin'
import { LoginBodySchema, type LoginBodySchemaType } from './schemas/login'
import { generateHash } from '../../utils/generate_hash'

export default fp(
  async function auth(fastify, opts) {
    fastify.post<{ Body: LoginBodySchemaType }>(
      '/login',
      {
        schema: {
          body: LoginBodySchema,
        },
      },
      async (request, reply) => {
        const user = await fastify.usersDataSource.findUser(request.body.email)
        if (!user) {
          const err = fastify.httpErrors.unauthorized(
            'Wrong credentials provided!',
          )
          throw err
        }

        const { hash } = await generateHash(request.body.password, user.salt)

        if (hash !== user.password) {
          const err = fastify.httpErrors.unauthorized(
            'Wrong credentials provided!',
          )
          throw err
        }

        const data = {
          token: request.generateToken({
            id: user.id,
            email: user.email,
          }),
        }
        return { success: 'true', data }
      },
    )
  },
  {
    name: 'auth-routes',
    encapsulate: true,
  },
)
