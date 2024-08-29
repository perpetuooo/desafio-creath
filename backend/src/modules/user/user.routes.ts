import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createSchedule, createUser, deleteAllUsers, deleteSchedule, deleteUser, getAllUsers, getBarbers, getUser, getUserByPhone, getUserSchedules, loginUser, logoutUser, registerOrLoginUser, updateSchedule, updateUser } from "./user.controller";
import { CreateScheduleSchema, CreateUserSchema, DeleteScheduleSchema, LoginUserSchema, UpdateUserSchema } from "./user.schemas";
import { z } from "zod";

export default async function userRoutes(fastify: FastifyInstance) {
  
  fastify.get("/",
    getAllUsers
  )

  fastify.get('/getUser', 
  { 
    preHandler: [fastify.authenticator] 
  }, 
    getUser
  );

  fastify.get("/phone",
    getUserByPhone
  );

  fastify.post("/register-or-login", 
    {
      schema: {
        body: CreateUserSchema
      }
    },
    registerOrLoginUser
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
        body: z.array(CreateScheduleSchema)
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

  fastify.delete("/deleteall",
    deleteAllUsers
  )
}
