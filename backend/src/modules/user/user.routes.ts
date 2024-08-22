import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email } = request.body as { name: string; email: string };

    try {
      const newUser = await prisma.user.create({
        data: { name, email },
      });
      return reply.code(201).send(newUser);
    } catch (error) {
      return reply.code(500).send({ error: "Error creating user" });
    }
  });

  fastify.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await prisma.user.findMany();
      return reply.send(users);
    } catch (error) {
      return reply.code(500).send({ error: "Error fetching users" });
    }
  });

  fastify.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }

      return reply.send(user);
    } catch (error) {
      return reply.code(500).send({ error: "Error fetching user" });
    }
  });

  fastify.put("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const { name, email } = request.body as { name: string; email: string };

    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email },
      });

      return reply.send(updatedUser);
    } catch (error) {
      return reply.code(500).send({ error: "Error updating user" });
    }
  });

  fastify.delete(
    "/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };

      try {
        await prisma.user.delete({
          where: { id: parseInt(id) },
        });

        return reply.code(204).send();
      } catch (error) {
        return reply.code(500).send({ error: "Error deleting user" });
      }
    }
  );
}
