import fastify, { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { CreateScheduleType, CreateUserType, DeleteScheduleType, LoginUserType, UpdateScheduleType, UpdateUserType } from "./user.schemas";
import { comparePassword, hashPassword } from "./user.utils";

export async function getUsers(req: FastifyRequest, rep: FastifyReply) {
  try {
    const { name } = req.query as { name?: string }

    if (name) {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                schedules: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                name: {
                    contains: name.toLowerCase(),
                }
            }
        })

        if (!users) {
          return rep.code(404).send({ error: "Usuário não encontrado..." })
        }

        return rep.code(200).send(users)

    } else {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                schedules: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        if (!users) {
          return rep.code(404).send({ error: "Usuário não encontrado..." })
        }

        return rep.code(200).send(users)
    }
  } catch(err) {
      console.error(err)
      return rep.code(500).send({ message: "Erro ao encontrar usuários." })
  }
}

export async function getBarbers(req: FastifyRequest, rep: FastifyReply) {
  try {
    const { name } = req.query as { name?: string }

    if (name) {
        const barbers = await prisma.barber.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                schedules: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                name: {
                    contains: name.toLowerCase(),
                }
            }
        })

        return rep.code(200).send(barbers)
    } else {
        const barbers = await prisma.barber.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                schedules: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return rep.code(200).send(barbers)
    }
  } catch(err) {
      console.error(err)
      return rep.code(500).send({ error: "Erro ao encontrar barbeiros." })
  }
}

export async function createUser(
  req: FastifyRequest<{ Body: CreateUserType }>,
  rep: FastifyReply
) {
  const { name, phone, password } = req.body

  try {
    const hashedPassword = await hashPassword(password);
    
    // console.log(hashedPassword)

    await prisma.user.create({
      data: {
        name: name,
        phone: phone,
        password: hashedPassword,
      },
    });

    return rep.code(201).send({ message: "Usuário registrado com sucesso!" });

  } catch (error) {
    return rep.code(500).send({ error: "Erro ao criar o usuário." });
  }
}

export async function loginUser(
  req: FastifyRequest<{ Body: LoginUserType }>,
  rep: FastifyReply
) {
  const { phone, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { phone } });
    
    // Tenta fazer login como um usuário.
    if (user) {
      const correctPassword = await comparePassword(password, user.password);

      if (!correctPassword) {
        return rep.code(401).send({ error: "Email ou senha inválidos." });
      }

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
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      });

      return { acessToken: token };
      
    } else {
      // Se não encontrar o usuário, tenta como um barbeiro.
      const barber = await prisma.barber.findUnique({ where: { phone } });

      if (barber) {
        const correctPassword = await comparePassword(password, barber.password);

      if (!correctPassword) {
        return rep.code(401).send({ error: "Email ou senha inválidos." });
      }
      
      const payload = {
        id: barber.id,
        phone: barber.phone,
        name: barber.name,
      };

      const token = req.jwt.sign(payload);
      rep.setCookie("acess_token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      });

      return { acessToken: token };

      } else {
        return rep.code(401).send({ error: "Email ou senha inválidos." });
      } 
    }
  } catch (error) {
    return rep.code(500).send({ error: "Erro ao realizar o login." });
  }
}

export async function logoutUser(req: FastifyRequest, rep: FastifyReply) {
  try {
    rep.clearCookie("acess_token");

    return rep.code(200).send({ message: "Usuário deslogado com sucesso!" })

  } catch(error) {
    console.error(error)
    return rep.code(500).send({ errror: "Erro ao deslogar usuário." })
  }
} 

export async function updateUser(
  req: FastifyRequest<{ Body: UpdateUserType }>,
  rep: FastifyReply
) {  
  try {
    const id = req.user.id;
    const { ...data } = req.body
    
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...data },
    });

    if (!updatedUser) {
      return rep.code(404).send({ error: "Usuário não encontrado..." });
    }

    return rep.send({ message: "Usuário atualizado com sucesso!" });
    
  } catch (error) {
    return rep.code(500).send({ error: "Erro ao atualizar o usuário." });
  }
}

export async function deleteUser(req: FastifyRequest, rep: FastifyReply) {
  try {
    const id = req.user.id

    const user = await prisma.user.delete({
      where: { id }
    });
    
    if (!user) {
      return rep.code(404).send({ message: "Usuário não encontrado..." })
    }

    return rep.code(204).send({ message: "Usuário deletado com sucesso!" });

  } catch (error) {
    console.error(error)
    return rep.code(500).send({ error: "Erro ao deletar o usuário." });
  }
}

export async function createSchedule(req: FastifyRequest<{Body: CreateScheduleType}>, rep: FastifyReply) {

  // const services = ["BARBA", "CABELO", "BARBA + CABELO", "PROGRESSIVA", "BARBA + CABELO + PROGRESSIVA"]

  try {
    const { ...data } = req.body

    await prisma.schedule.create({
      data: {
        userId: req.user.id,
        ...data,
      }
    })

    return rep.code(201).send({ message: "Agendamento criado com sucesso!" })

  } catch(error) {
    console.error(error)
    return rep.code(500).send({ error: "Erro ao criar o agendamento." })
  }
}

export async function getUserSchedules(req: FastifyRequest, rep: FastifyReply) {
  try {
    const userId = req.user.id

    const schedules = await prisma.schedule.findMany({
      where: {
        userId
      }
    })

    if (!schedules) {
      return rep.code(404).send({ error: "Usuário não tem agendamentos." })
    }

    return rep.code(200).send(schedules)

  } catch(error) {
    console.error(error)
    return rep.code(500).send({ error: "Erro ao encontrar agendamentos." })
  }
}

export async function updateSchedule(req: FastifyRequest<{Body: UpdateScheduleType}>, rep: FastifyReply) {
  try {
    const { id, ...data } = req.body
    const userId = req.user.id

    // Verifica se o agendamento é do usuário.
    const schedule = await prisma.schedule.findUnique({
      where: {
        id,
        userId,
      }
    })

    if(!schedule) {
      return rep.code(404).send({ error: "Agendamento não encontrado." })
    }

    await prisma.schedule.update({
      where: { id },
      data: { ...data },
    })

    return rep.code(200).send({ message: "Agendamento atualizado com sucesso!" })

  } catch(error) {
    console.error(error)
    return rep.code(500).send({ error: "Erro ao atualizar agendamento." })
  }
}

export async function deleteSchedule(req: FastifyRequest<{Body: DeleteScheduleType}>, rep: FastifyReply) {
  try {
    const { id } = req.body
    const userId = req.user.id

    // Verifica se o agendamento é do usuário.
    const schedule = await prisma.schedule.findUnique({
      where: {
        id,
        userId
      }
    })

    if (!schedule) {
      return rep.code(404).send({ error: "Agendamento não encontrado."})
    }

    await prisma.schedule.delete({ where: { id } })

    return rep.code(204).send({ message: "Agendamento deletado com sucesso!" })

  } catch(error) {
    console.error(error)
    return rep.code(500).send({ error: "Erro ao deletar agendamento." })
  }
}
