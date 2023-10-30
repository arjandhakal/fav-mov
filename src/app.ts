import { type FastifyInstance, type FastifyPluginOptions } from 'fastify'
import Sensible from '@fastify/sensible'

interface FavMovies {
  title: string
  description: string
}

const favMovies: FavMovies[] = []

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
): Promise<void> {
  await fastify.register(Sensible)

  fastify.route({
    url: '/movies',
    method: 'GET',
    handler: function myHandler(request, reply) {
      reply.send({
        message: 'Movies listed successfully',
        success: true,
        data: favMovies,
      })
    },
  })

  fastify.route({
    url: '/movies',
    method: 'POST',
    handler: function handler(request, reply) {
      const data = request.body as FavMovies
      if (!data?.title || !data?.description) {
        throw fastify.httpErrors.badRequest(
          'Please ensure both title and description is provided',
        )
      }
      favMovies.push({
        title: data.title,
        description: data.description,
      })

      reply.send({
        message: 'Movie added succesfully',
        success: true,
        data: null,
      })
    },
  })
}
