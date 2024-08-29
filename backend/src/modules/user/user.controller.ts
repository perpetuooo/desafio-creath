import fastify, { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { CreateScheduleType, CreateUserType, DeleteScheduleType, LoginUserType, UpdateScheduleType, UpdateUserType } from "./user.schemas";
import { comparePassword, hashPassword } from "./user.utils";

// Lógica de cadastro e login.
export async function registerOrLoginUser(
  req: FastifyRequest<{ Body: CreateUserType }>,
  rep: FastifyReply
) {
  const {phone, password } = req.body;

  try {
    let user = await prisma.user.findUnique({ where: { phone } });
    
    // Caso não exista um usuário com o telefone inserido, faz o cadastro do mesmo.
    if (!user) {
      const hashedPassword = await hashPassword(password);

      user = await prisma.user.create({
        data: {
          phone,
          password: hashedPassword,
        },
      });
    } else {
      // Caso exista o usuário, compara as hashs de senha e gera o access token.
      const correctPassword = await comparePassword(password, user.password);

      if (!correctPassword) {
        return rep.code(401).send({ error: "Senha incorreta." });
      }
    }

    const payload = {
      id: user.id,
      phone: user.phone,
      name: user.name,
    };

    const token = req.jwt.sign(payload);
    rep.setCookie("access_token", token, {
      path: "/",
      httpOnly: true,
      sameSite: 'lax',
      priority: 'high',
      secure: true,
    });

    return { accessToken: token }

  } catch (error) {
    console.error(error);
    return rep.code(500).send({ error: "Erro ao processar a requisição." });
  }
}

// Lógica de logout.
export async function logoutUser(req: FastifyRequest, rep: FastifyReply) {
  try {
    rep.clearCookie("access_token"); 

    return rep.code(200).send({ message: "Usuário deslogado com sucesso!" })

  } catch(error) {
    console.error(error)
    return rep.code(500).send({ errror: "Erro ao deslogar usuário." })
  }
} 

// Retorna um usuário pelo ID.
export async function getUser(req: FastifyRequest, rep: FastifyReply) {
  try {
   
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return rep.code(404).send({ error: "Usuário não encontrado." });
    }

    return rep.code(200).send(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return rep.code(500).send({ error: "Erro ao buscar usuário." });
  }
}

// Retorna um usuário pelo telefone.
export async function getUserByPhone(req: FastifyRequest, rep: FastifyReply) {
  try {
    const { phone } = req.query as { phone?: string };

    if (!phone) {
      return rep.code(400).send({ error: "Parâmetro 'phone' é obrigatório." });
    }

    const user = await prisma.user.findUnique({
      where: { phone },
      select: {
        name: true,
        phone: true,
        email: true,
        birthDate:true,
      }
    });

    if (!user) {
      return rep.code(404).send({ error: "Usuário não encontrado..." });
    }

    return rep.code(200).send(user);
  } catch (err) {
    console.error(err);
    return rep.code(500).send({ message: "Erro ao encontrar usuário." });
  }
}

// Retorna todos os barbeiros.
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

// Atualiza o usuário baseado nas informações recebidas.
export async function updateUser(
  req: FastifyRequest<{ Body: UpdateUserType }>,
  rep: FastifyReply
) {  
  try {
    const id = req.user.id;
    const { ...data } = req.body;

    // Converte a string para Date se existirem
    const updatedData: any = {
      ...data,
      ...(data.birthDate && { birthDate: new Date(data.birthDate) }),
    };

    // console.log(updatedData)
    
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });

    if (!updatedUser) {
      return rep.code(404).send({ error: "Usuário não encontrado..." });
    }

    return rep.send({ message: "Usuário atualizado com sucesso!" });
    
  } catch (error) {
    return rep.code(500).send({ error: "Erro ao atualizar o usuário." });
  }
}

// Deleta o usuário baseado no seu ID.
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

// Lógica da criação de agendamentos
export async function createSchedule(req: FastifyRequest<{ Body: Array<CreateScheduleType> }>, rep: FastifyReply) {
  const schedules = req.body;

 
  if (!Array.isArray(schedules) || schedules.length === 0) {
    return rep.code(400).send({ error: "Nenhum agendamento fornecido." });
  }

  try {
    // Criar múltiplos agendamentos usando uma transação
    await prisma.$transaction(
      schedules.map(schedule =>
        prisma.schedule.create({
          data: {
            userId: req.user.id,
            ...schedule,
          }
        })
      )
    );
 
    return rep.code(201).send({ message: "Agendamentos criados com sucesso!" });
  } catch (error) {
    console.error(error);
    return rep.code(500).send({ error: "Erro ao criar agendamentos." });
  }
}

// Retorna todos os agendamentos do usuário logado.
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

// Lógica de atualizar os agendamentos do usuário.
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

// Lógica de deletar os agendamentos do usuário.
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

// -- HANDLERS PARA TESTES NO POSTMAN --

export async function getAllUsers(req: FastifyRequest, rep: FastifyReply) {
  try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          schedules: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      if (!users) {
        return rep.code(404).send({ error: "Usuário não encontrado..." })
      }

      return rep.code(200).send(users)

    } catch (err) {
    console.error(err)
    return rep.code(500).send({ message: "Erro ao encontrar usuários." })
  }
}

export async function deleteAllUsers(req: FastifyRequest, rep: FastifyReply) {
  try {
    const users = await prisma.user.deleteMany()

    if(!users) {
      return rep.code(404).send({ error: "Nenhum usuário encontrado." })
    }

    return rep.code(200).send({ message: "Usuários deletados com sucesso!" })

  } catch(error) {
    console.error(error)
    return rep.code(500).send({ error: "Erro ao deletar todos os usuários." })
  }
}

export async function deleteAllSchedules(req: FastifyRequest, rep: FastifyReply) {
  try {
    const schedules = await prisma.schedule.deleteMany()

    if(!schedules) {
      return rep.code(404).send({ error: "Nenhum agendamento encontrado." })
    }

    return rep.code(200).send({ message: "Agendamentos deletados com sucesso!" })

  } catch(error) {
    console.error(error)
    return rep.code(500).send({ error: "Erro ao deletar todos os agendamentos."})
  }
}

// export async function createUser(
//   req: FastifyRequest<{ Body: CreateUserType }>,
//   rep: FastifyReply
// ) {
//   const { name, phone, password } = req.body

//   try {
//     const hashedPassword = await hashPassword(password);

//     await prisma.user.create({
//       data: {
//         name: name,
//         phone: phone,
//         password: hashedPassword,
//       },
//     });

//     return rep.code(201).send({ message: "Usuário registrado com sucesso!" });

//   } catch (error) {
//     return rep.code(500).send({ error: "Erro ao criar o usuário." });
//   }
// }

// export async function loginUser(
//   req: FastifyRequest<{ Body: LoginUserType }>,
//   rep: FastifyReply
// ) {
//   const { phone, password } = req.body

//   try {
//     const user = await prisma.user.findUnique({ where: { phone } });
    
//     // Tenta fazer login como um usuário.
//     if (user) {
//       const correctPassword = await comparePassword(password, user.password);

//       if (!correctPassword) {
//         return rep.code(401).send({ error: "Email ou senha inválidos." });
//       }

//       const payload = {
//         id: user.id,
//         phone: user.phone,
//         name: user.name,
//       };

//       const token = req.jwt.sign(payload);
//       rep.setCookie("access_token", token, {
//         path: "/",
//         httpOnly: true,
//         secure: true,
//         expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
//       });

//       return { accessToken: token };
      
//     } else {
//       // Se não encontrar o usuário, tenta como um barbeiro.
//       const barber = await prisma.barber.findUnique({ where: { phone } });

//       if (barber) {
//         const correctPassword = await comparePassword(password, barber.password);

//       if (!correctPassword) {
//         return rep.code(401).send({ error: "Email ou senha inválidos." });
//       }
      
//       const payload = {
//         id: barber.id,
//         phone: barber.phone,
//         name: barber.name,
//       };

//       const token = req.jwt.sign(payload);
//       rep.setCookie("access_token", token, {
//         path: "/",
//         httpOnly: true,
//         secure: true,
//         expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
//       });

//       return { accessToken: token };

//       } else {
//         return rep.code(401).send({ error: "Email ou senha inválidos." });
//       } 
//     }
//   } catch (error) {
//     return rep.code(500).send({ error: "Erro ao realizar o login." });
//   }
// }
