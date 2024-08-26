import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createSchedule, createUser, deleteSchedule, deleteUser, getBarbers, getUsers, getUserSchedules, loginUser, logoutUser, updateSchedule, updateUser } from "./user.controller";
import { CreateScheduleSchema, CreateUserSchema, DeleteScheduleSchema, LoginUserSchema, UpdateUserSchema } from "./user.schemas";

export default async function userRoutes(fastify: FastifyInstance) {
  
  fastify.get("/:name", 
    getUsers
  );

  fastify.get("/barbers:name",
    getBarbers
  )

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
    {
      preHandler: [fastify.authenticator],
    },
    logoutUser
   )

  fastify.put("/update",
    {
      preHandler: [fastify.authenticator],
      schema: {
        body: UpdateUserSchema
      }
    },
    updateUser
  );

  fastify.delete("/delete",
    {
      preHandler: [fastify.authenticator]
    },
    deleteUser 
  );

  fastify.post("/create",
    {
      preHandler: [fastify.authenticator],
      schema: {
        body: CreateScheduleSchema
      }
    },
    createSchedule
  )

  fastify.get("/schedules",
     {
      preHandler: [fastify.authenticator],
     },
     getUserSchedules
  )

  fastify.put("/scheduleupdate",
    {
      preHandler: [fastify.authenticator],
    },
    updateSchedule
  )

  fastify.delete("/erase",
    {
      preHandler: [fastify.authenticator],
      schema: {
        body: DeleteScheduleSchema
      }
    },
    deleteSchedule
  )
}
