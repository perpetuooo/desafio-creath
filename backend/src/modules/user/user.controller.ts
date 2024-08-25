import fastify, { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { CreateUserType, LoginUserType, UpdateUserType } from "./user.schemas";
import { comparePassword, hashPassword } from "./user.utils";

export async function createUser(
  req: FastifyRequest<{ Body: CreateUserType }>,
  rep: FastifyReply
) {
  const { name, phone, password } = req.body as {
    name: string;
    phone: string;
    password: string;
  };

  try {
    //Implementar lógica do hasheamento de senhas aqui.
    const hashedPassword = await hashPassword(password);

    // Ex: const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
      data: {
        name: name,
        phone: phone,
        password: hashedPassword, // <-- Depois, passar a hashedPassword nesse campo.
      },
    });
    return rep.code(201).send(newUser);
  } catch (error) {
    return rep.code(500).send({ error: "Error creating user" });
  }
}

export async function loginUser(
  req: FastifyRequest<{ Body: LoginUserType }>,
  rep: FastifyReply
) {
  const { phone, password } = req.body as { phone: string; password: string };

  try {
    const user = await prisma.user.findUnique({ where: { phone } });
    const correctPassword = await comparePassword(password, user?.password);
    //Implementar lógica de comparação de senhas aqui.
    //Ex: const correctPassword = await comparePassword(password, user.password)
    //Abaixo, a lógica de login já está completa.

    if (user && correctPassword) {
      const payload = {
        id: user.id,
        phone: user.phone,
        name: user.name,
      };

      const token = req.jwt.sign(payload);

      rep.setCookie("acess_token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
      });

      return { acessToken: token };
    } else {
      return rep.code(401).send({ error: "Email ou senha inválidos." });
    }
  } catch (error) {
    return rep.code(500).send({ error: "Error loging user" });
  }
}

export async function logoutUser(req: FastifyRequest, rep: FastifyReply) {
  rep.clearCookie("acess_token");
}

export async function getUsers(req: FastifyRequest, rep: FastifyReply) {
  try {
    const users = await prisma.user.findMany();
    return rep.send(users);
  } catch (error) {
    return rep.code(500).send({ error: "Error fetching users" });
  }
}

export async function getUserById(req: FastifyRequest, rep: FastifyReply) {
  const { id } = req.params as { id: string };

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return rep.code(404).send({ error: "User not found" });
    }

    return rep.send(user);
  } catch (error) {
    return rep.code(500).send({ error: "Error fetching user" });
  }
}

export async function updateUserById(
  req: FastifyRequest<{ Body: UpdateUserType }>,
  rep: FastifyReply
) {
  const { id } = req.params as { id: string };
  const { name, phone, password } = req.body as {
    name: string;
    phone: string;
    password: string;
  };

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, phone, password },
    });

    return rep.send({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    return rep.code(500).send({ error: "Error updating user" });
  }
}

export async function deleteUserById(req: FastifyRequest, rep: FastifyReply) {
  const { id } = req.params as { id: string };

  try {
    await prisma.user.delete({
      where: { id },
    });

    return rep.code(204).send();
  } catch (error) {
    return rep.code(500).send({ error: "Error deleting user" });
  }
}
