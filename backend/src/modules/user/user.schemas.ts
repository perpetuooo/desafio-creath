import { z } from "zod";

// Esquema de validação para criação de um novo usuário
export const CreateUserSchema = z.object({
  name: z.string().optional(),
  phone: z
    .string({
      required_error: "Digite seu telefone",
      invalid_type_error: "Telefone inválido",
    }),
  email: z
    .string({
      required_error: "Digite seu e-mail",
      invalid_type_error: "E-mail inválido",
    })
    .email()
    .optional(), 
  password: z
    .string({
      required_error: "Digite sua senha",
    })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// Esquema de validação para realizar o login de um usuário.
export const LoginUserSchema = z.object({
  phone: z
  .string({
    required_error: "Digite seu telefone",
    invalid_type_error: "Telefone inválido",
  }),
password: z
  .string({
    required_error: "Digite sua senha",
  })
  .min(6, "A senha deve ter pelo menos 6 caracteres"),
})


// Esquema de validação para atualizar as informações de um usuário.
export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(), // Adiciona o campo email como opcional
  password: z.string().optional(),
}).optional();

// Esquema de validação para um usuário existente.
// Deixei o nome e email para validação, porém acho que seria melhor colocar só o email ou o nome para mais agilidade.
export const UserSchema = z.object({
  name: z.string().min(1, "Digite seu nome").optional(),
  phone: z
    .string({
      required_error: "Digite seu telefone",
      invalid_type_error: "Telefone inválido",
    }),
  password: z.string({
    required_error: "Digite sua senha",
    invalid_type_error: "Senha inválida",
  }),
  email: z.string({
    invalid_type_error: "Email inválido",
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PhoneQuerySchema = z.object({
  phone: z.string().min(10, "Telefone é obrigatório")
});

export const CreateScheduleSchema = z.object({
  // dateTime é baseada no padrão ISO 8601.
  dateTime: z
  .string({
    required_error: "Escolha uma data.",
    invalid_type_error: "Data inválida.",
  }).datetime(),
  userId: z
  .string({
    required_error: "Escolha um usuário.",
    invalid_type_error: "ID do usuário inválido."
  }).uuid().optional(),
  barberId: z
  .string({
    required_error: "Escolha um barbeiro.",
    invalid_type_error: "ID do barbeiro inválido."
  }).uuid(),
  service: z
  .string({
    required_error: "Escolha um serviço.",
    invalid_type_error: "Serviço inválido."
  }),
  serviceValue: z
  .string({
    required_error: "Escolha um serviço.",
    invalid_type_error: "Serviço inválido."
  })
})

export const UpdateScheduleSchema = z.object({
  id: z.number(),
  dateTime: z.string().datetime().optional(),
  userId: z.string().uuid().optional(),
  barberId: z.string().uuid().optional(),
  service: z.string().optional(),
})

export const DeleteScheduleSchema = z.object({
  id: z.number()
})

// Tipos derivados dos esquemas
export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
export type CreateScheduleType = z.infer<typeof CreateScheduleSchema>;
export type UpdateScheduleType = z.infer<typeof UpdateScheduleSchema>;
export type DeleteScheduleType = z.infer<typeof DeleteScheduleSchema>;
export type UserType = z.infer<typeof UserSchema>;
