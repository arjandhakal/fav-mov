import Fastify from 'fastify'
import App from './app'

async function start(): Promise<void> {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(App)

  await fastify.listen({
    host: '0.0.0.0',
    port: 8081,
  })
}

start().catch(err => {
  console.error(err)
  process.exit(1)
})
