import fastify from "fastify"
import formBody from "@fastify/formbody"
import cors from '@fastify/cors'
import appconfig from "../pkg/config/appconfig"
import { setupGlobalErrorHandlers } from "../pkg/errors/error-handler"
import SlotModule from "../modules/slot/slot.module"

(async () => {
  const server = fastify({ logger: true })

  await server.register(formBody)
  await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })

  server.get('/api', async (_, reply) => reply.send({ msg: "pong" }))
  new SlotModule(server)

  try {
    setupGlobalErrorHandlers()
    await server.listen({
      port: appconfig.PORT,
      host: '0.0.0.0'
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
})()