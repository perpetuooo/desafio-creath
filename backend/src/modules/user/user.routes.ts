import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from "./user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/create", 
    createUser
  );

  fastify.get("/", 
    getUsers
  );
    

  fastify.get("/:id",
    getUserById
   );

  fastify.put("/:id",
    updateUserById
  );

  fastify.delete("/:id",
    deleteUserById 
  );
}
