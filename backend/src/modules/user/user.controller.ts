import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";

export async function createUser (request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = request.body as { name: string; email: string };

    try {
      const newUser = await prisma.user.create({
        data: { name, email },
      });
      return reply.code(201).send(newUser);
    } catch (error) {
      return reply.code(500).send({ error: "Error creating user" });
    }
  }
    
export async function getUsers (request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await prisma.user.findMany();
      return reply.send(users);
    } catch (error) {
      return reply.code(500).send({ error: "Error fetching users" });
    }
  }

  export async function getUserById (request: FastifyRequest, reply: FastifyReply) {
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
  }

  export async function updateUserById (request: FastifyRequest, reply: FastifyReply) {
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
  }

  export async function deleteUserById (request: FastifyRequest, reply: FastifyReply) {
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