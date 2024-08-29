import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createSchedule, deleteAllSchedules, deleteAllUsers, deleteSchedule, deleteUser, getAllUsers, getBarbers, getUser, getUserByPhone, getUserSchedules, logoutUser, registerOrLoginUser, updateSchedule, updateUser } from "./user.controller";
import { CreateScheduleSchema, CreateUserSchema, DeleteScheduleSchema, LoginUserSchema, UpdateUserSchema } from "./user.schemas";
import { z } from "zod";

// Rotas da API no contexto dos usuários.
export default async function userRoutes(fastify: FastifyInstance) {
  
  fastify.get('/getUser', 
    { 
      preHandler: [fastify.authenticator] 
    }, 
    getUser
  );
  
  fastify.get("/phone",
    { 
      preHandler: [fastify.authenticator] 
    }, 
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
  
  // -- ROTAS PARA TESTES NO POSTMAN --

  fastify.get("/getAll",
    getAllUsers
  )

  fastify.delete("/deleteAllUsers",
    deleteAllUsers
  )

  fastify.delete("/deleteAllSchedules",
    deleteAllSchedules
  )

  // fastify.post("/register", 
  //   {
  //     schema: {
  //       body: CreateUserSchema
  //     }
  //   },
  //   createUser
  // );
  
  // fastify.post("/login",
  //   {
  //     schema: {
  //       body: LoginUserSchema
  //     }
  //   },
  //   loginUser
  //  )
}




