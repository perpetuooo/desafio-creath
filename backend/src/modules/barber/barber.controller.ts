import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { UpdateScheduleAdminInput, UpdateUserAdminInput } from "./barber.schemas";
import { CreateUserType } from "../user/user.schemas";
import { hashPassword } from "../user/user.utils";

export async function createBarber (  req: FastifyRequest<{ Body: CreateUserType }>, rep: FastifyReply) {
    const { name, phone, password } = req.body
  
    try {
      const hashedPassword = await hashPassword(password);
      
      // console.log(hashedPassword)
  
      await prisma.barber.create({
        data: {
          name: name,
          phone: phone,
          password: hashedPassword,
        },
      });
  
      return rep.code(201).send({ message: "Barbeiro registrado com sucesso!" });
  
    } catch (error) {
      return rep.code(500).send({ error: "Erro ao criar o barbeiro." });
    }
}

export async function updateBarber (req: FastifyRequest, rep:FastifyReply) {

}

export async function deleteBarber (req: FastifyRequest, rep: FastifyReply) {

}

export async function upgradeUserToBarber (req: FastifyRequest, rep: FastifyReply) {
    try {
        const { phone } = req.params as { phone: string }
        
        const user = await prisma.user.findUnique({
            where: { phone }
        })

        if (!user) {
            return rep.code(404).send({ message: "Usuário não encontrado."})
        }

        const barber = await prisma.barber.create({
            data: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                password: user.password
            }
        })

        await prisma.user.delete({
            where: { phone }
        })

        return rep.code(201).send(barber)
    } catch(err) {
        console.error(err)
        rep.code(500).send(err)
    }
}

export async function updateUserAsAdmin (
    req: FastifyRequest<{ Body: UpdateUserAdminInput }>, 
    rep: FastifyReply) {

}

export async function deleteUserAsAdmin (req: FastifyRequest, rep: FastifyReply) {
    try {

        const { phone } = req.params as { phone: string }

         // console.log(phone)

        const user = await prisma.user.delete({
            where: { phone }
        })

        if (user) {
            return rep.code(200).send({ message: "Usuário deletado com sucesso!"})

        } else {
            return rep.code(404).send({ error: "Usuário não encontrado..."})
        }

    } catch(err) {
        console.error(err)
        return rep.code(500).send({ error: "Erro ao deletar o usuário."})
    }
}

export async function updateScheduleAsAdmin (
    req: FastifyRequest<{ Body: UpdateScheduleAdminInput }>, 
    rep: FastifyReply) {
    try {
        const { id, ...data } = req.body as any

        const schedule = await prisma.schedule.update({
            where: { id },
            data: { ...data }
        })

        if (schedule) {
            rep.code(200)
        } else {

        }

    } catch(err) {
        console.error(err)
        rep.code(500).send(err)
    }
}

export async function deleteScheduleAsAdmin (req: FastifyRequest, rep: FastifyReply) {
    try {

        const { id } = req.params as { id: number }

        const user = await prisma.schedule.delete({
            where: { id }
        })

        if (user) {
            return rep.code(200).send({ message: "Agendamento deletado com sucesso!"})
        } else {
            return rep.code(404).send({ message: "Agendamento não existe."})
        }

    } catch(err) {
        console.error(err)
        return rep.code(500).send(err)
    }

}