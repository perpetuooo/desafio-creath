import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUser, deleteUserById, getUserById, getUsers, loginUser, logoutUser, updateUserById } from "./user.controller";
import { CreateUserSchema, LoginUserSchema, UpdateUserSchema } from "./user.schemas";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/register", 
    {
      schema: {
        body: CreateUserSchema
      }
    },
    createUser
  );

  fastify.post("/login",
    {
      schema: {
        body: LoginUserSchema
      }
    },
    loginUser
   )

   fastify.delete("/logout",
    logoutUser
   )

  fastify.get("/", 
    {
      preHandler: [fastify.authenticator],
    },
    getUsers
  );
    

  fastify.get("/:id",
    getUserById
   );

  fastify.put("/:id",
    {
      schema: {
        body: UpdateUserSchema
      }
    },
    updateUserById
  );

  fastify.delete("/:id",
    deleteUserById 
  );
}
