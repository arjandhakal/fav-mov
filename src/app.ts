import { type FastifyInstance, type FastifyPluginOptions } from 'fastify'
import AutoLoad from '@fastify/autoload'
import Sensible from '@fastify/sensible'
import Env from '@fastify/env'
import Cors from '@fastify/cors'
import { join } from 'path'
import { EnvSchema } from './schemas/dotenv'

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
): Promise<void> {
  await fastify.register(Env, {
    schema: EnvSchema,
    dotenv: true,
    data: opts.configData,
  })

  await fastify.register(Sensible)

  await fastify.register(Cors, {
    origin: true,
  })

  await fastify.register(AutoLoad, {
    dir: join(__dirname, '.', 'plugins'),
    dirNameRoutePrefix: false,
    ignorePattern: /.*.no-load\.js/,
    indexPattern: /^no$/i,
    options: Object.assign({}, opts),
  })

  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    indexPattern: /.*routes(\.js|\.cjs)$/i,
    ignorePattern: /.*\.js/,
    autoHooksPattern: /.*hooks(\.js|\.cjs|\.ts)$/i,
    autoHooks: true,
    cascadeHooks: true,
    options: Object.assign({}, opts),
  })

  if (fastify.config.NODE_ENV === 'development') {
    console.log('CURRENT ROUTES:')
    console.log(fastify.printRoutes())
  }

  // Add an onClose hook to close any open connections such as connections to DB
  fastify.addHook('onClose', async fastify => {
    console.log('Running onClose hook...')
    if (fastify.knex) {
      await fastify.knex.destroy()
    }
    console.log('Running onClose hook complete')
  })
}
