import { FastifyInstance } from "fastify";
import { createBarber } from "./barber.controller";
import { CreateUserSchema } from "../user/user.schemas";

export default async function barberRoutes(fastify: FastifyInstance) {
    fastify.post("/register", 
        {
          schema: {
            body: CreateUserSchema
          }
        },
        createBarber
      );
}