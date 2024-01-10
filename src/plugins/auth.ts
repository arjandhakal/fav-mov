import fp from 'fastify-plugin'
import FastifyJWT from '@fastify/jwt'
import type { FastifyRequest } from 'fastify/types/request'
import type { FastifyReply } from 'fastify'

export default fp(
  async function authenticatePlugin(fastify, opts) {
    await fastify.register(FastifyJWT, {
      secret: fastify.config.JWT_SECRET,
    })

    fastify.decorate(
      'authenticate',
      async function authenticate(
        request: FastifyRequest,
        reply: FastifyReply,
      ) {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.send(err)
        }
      },
    )

    fastify.decorateRequest(
      'generateToken',
      function (payload: Record<string, any>) {
        const token = fastify.jwt.sign(
          {
            ...payload,
          },
          {
            jti: String(Date.now()),
            expiresIn: fastify.config.JWT_EXPIRES_IN,
          },
        )
        return token
      },
    )
  },
  {
    name: 'authentication-plugin',
  },
)
