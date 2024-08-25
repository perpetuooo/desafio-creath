import { z } from "zod";

// Esquema de validação para criação de um novo usuário
export const CreateUserSchema = z.object({
  name: z.string().min(1, "Digite seu nome"),
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
  password: z.string().optional()
}).optional()

// Esquema de validação para um usuário existente.
// Deixei o nome e email para validação, porém acho que seria melhor colocar só o email ou o nome para mais agilidade.
export const UserSchema = z.object({
  name: z.string().min(1, "Digite seu nome"),
  phone: z
    .string({
      required_error: "Digite seu telefone",
      invalid_type_error: "Telefone inválido",
    }),
  password: z.string({
    required_error: "Digite sua senha",
    invalid_type_error: "Senha inválida",
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Tipos derivados dos esquemas
export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
export type UserType = z.infer<typeof UserSchema>;
