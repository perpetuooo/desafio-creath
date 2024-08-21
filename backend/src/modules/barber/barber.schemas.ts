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

export type AddServiceInput = z.infer<typeof addServiceSchema>