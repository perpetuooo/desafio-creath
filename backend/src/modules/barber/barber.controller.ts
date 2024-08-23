import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { AddServiceInput, UpdateScheduleAdminInput, UpdateServiceInput, UpdateUserAdminInput } from "./barber.schemas";

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
                },
                where: {
                    name: {
                        contains: name.toLowerCase(),
                    }
                }
            })
    
            return rep.code(200).send(users)

        } else {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    schedules: true,
                }
            })
    
            return rep.code(200).send(users)
        }
    } catch(err) {
        console.error(err)
        return rep.code(500).send(err)
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
                    services: true,
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
                    services: true,
                }
            })
    
            return rep.code(200).send(barbers)
        }
    } catch(err) {
        console.error(err)
        return rep.code(500).send(err)
    }
}

//export async function loginBarber (req: FastifyRequest, rep: FastifyReply) {}

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

export async function addService(
    req: FastifyRequest<{ Body: AddServiceInput }>, 
    rep: FastifyReply) {
        const { ...data } = req.body

    try {
        await prisma.services.create({
            data: {
                ...data,
                barberId: ""
            }
        })

        return rep.code(201).send({ message: "Serviço criado com sucesso!" })
    } catch(err) {
        console.error(err)
        return rep.code(500).send(err)
    }
}

export async function updateService(
    req: FastifyRequest<{ Body: UpdateServiceInput }>,
    rep:FastifyReply) {

}

export async function deleteService (req: FastifyRequest, rep: FastifyReply) {
    try {

        const { id } = req.params as { id: number }

        const service = await prisma.services.delete({
            where: { id }
        })

        if (service) {
            return rep.code(200).send({ message: "Serviço deletado com sucesso!"})
        } else {
            return rep.code(404).send({ message: "Serviço não encontrado..."})
        }

    } catch(err) {
        console.error(err)
        return rep.code(500).send(err)
    }
}

export async function updateUserAsAdmin (
    req: FastifyRequest<{ Body: UpdateUserAdminInput }>, 
    rep: FastifyReply) {

}

export async function deleteUserAsAdmin (req: FastifyRequest, rep: FastifyReply) {
    try {

        const { phone } = req.params as { phone: string }

        const service = await prisma.user.delete({
            where: { phone }
        })

        if (service) {
            return rep.code(200).send({ message: "Usuário deletado com sucesso!"})
        } else {
            return rep.code(404).send({ message: "Usuário não encontrado..."})
        }

    } catch(err) {
        console.error(err)
        return rep.code(500).send(err)
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

        const service = await prisma.schedule.delete({
            where: { id }
        })

        if (service) {
            return rep.code(200).send({ message: "Agendamento deletado com sucesso!"})
        } else {
            return rep.code(404).send({ message: "Agendamento não existe..."})
        }

    } catch(err) {
        console.error(err)
        return rep.code(500).send(err)
    }

}