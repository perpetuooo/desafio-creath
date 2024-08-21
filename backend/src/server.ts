import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import cors from '@fastify/cors'
import barberRoutes from "./modules/barber/barber.routes";

const app = Fastify({ logger: true })

app.register(cors, {
    origin: '*'
})

async function main() {
    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    app.register(barberRoutes, { prefix: 'api/barber' })
    
    app.get('/', (req: FastifyRequest, rep: FastifyReply) => {
        rep.send({ message: "Barba, Cabelo e Bigode." })
    })
    
    const port = process.env.PORT ? parseInt(process.env.PORT) : 8080
    const host = process.env.HOST || '0.0.0.0'
    
    await app.listen({ 
        port: port,
        host: host 
    }).then(() => {
        console.log('Server running at port ' + port)
    }).catch(err => {
        console.error(err)
        process.exit(1)
    })
}

main()

process.on('SIGINT', async () => {
    process.exit()
  })
  
  process.on('SIGTERM', async () => {
    process.exit()
  })
  