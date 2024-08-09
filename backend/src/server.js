import fastify from "fastify"
import { prisma } from "./lib/prisma";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import cors from '@fastify/cors'

import { env } from "./env";

const app = fastify()

app.register(cors, {
    origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)




app.listen({ port: env.PORT}).then(()=>{
    console.log('Server running')
})

