import { type FastifyInstance, type FastifyPluginOptions } from 'fastify'

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
): Promise<void> {
  fastify.route({
    url: '/movies',
    method: 'GET',
    handler: function myHandler(request, reply) {
      reply.send('movies list')
    },
  })
}
