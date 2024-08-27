import { FastifyInstance } from "fastify";
import { createBarber } from "./barber.controller";
import { CreateUserSchema } from "../user/user.schemas";
import { PrismaClient } from "@prisma/client";

// Criei uma instância global do PrismaClient, get Barbers foi necessario fazer para a pagina selecionarBarbeiros
const prisma = new PrismaClient();

export default async function barberRoutes(fastify: FastifyInstance) {
    fastify.post("/register", 
        {
          schema: {
            body: CreateUserSchema
          }
        },
        createBarber
    );

    fastify.get('/barbers', async (request, reply) => {
        try {
            const barbers = await prisma.barber.findMany(); // Use prisma diretamente
            reply.send(barbers);
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao buscar barbeiros' });
        }
    });
}
