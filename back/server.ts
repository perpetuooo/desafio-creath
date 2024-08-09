import Fastify, { FastifyReply, FastifyRequest } from "fastify";

const server = Fastify({logger: true})

server.get('/', async function (req: FastifyRequest, rep: FastifyReply) {
    return {message: "hello, world!"}
})

async function main() {
    try {
        await server.listen({
            port: 8080,
            host: "0.0.0.0",
        })
    } catch(err) {
        console.error(err)
        process.exit(1)
    }
}

main().catch(err => {
    console.error(err)
    process.exit(1)
  }).then(() => {
    console.log('Server online at http://localhost:8080 !!!')
  })


process.on('SIGINT', async () => {
    process.exit()
  })
  
  process.on('SIGTERM', async () => {
    process.exit()
  })