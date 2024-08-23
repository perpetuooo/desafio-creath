import { z } from "zod";

export const addServiceSchema = z.object({
    name: z.string({
        required_error: "Insira o nome do serviço.",
        invalid_type_error: "Nome de serviço inválido."
    }),
    price: z.number({
        required_error: "Insira o preço do serviço.",
        invalid_type_error: "Preço do serviço inválido."
    }).nonnegative({ message: "O preço deve ser positivo." }),
})

export const updateServiceSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    price: z.number().optional(),
    barberId: z.string().optional(),
}).optional()

export const updateUserAdminSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
}).optional()

export const updateScheduleAdminSchema = z.object({
    dateTime: z.date().optional(),
    userId: z.string().optional(),
    barberId: z.string().optional(),
    serviceId: z.string().optional(),
}).optional()

export type AddServiceInput = z.infer<typeof addServiceSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>
export type UpdateUserAdminInput = z.infer<typeof updateUserAdminSchema>
export type UpdateScheduleAdminInput = z.infer<typeof updateScheduleAdminSchema>