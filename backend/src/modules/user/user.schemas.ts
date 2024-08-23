import { z } from "zod";

// Esquema de validação para criação de um novo usuário
export const CreateUserSchema = z.object({
  name: z.string().min(1, "Digite seu nome"),
  email: z
    .string({
      required_error: "Digite seu email",
      invalid_type_error: "Email inválido",
    })
    .email(),
  password: z
    .string({
      required_error: "Digite sua senha",
    })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// Esquema de validação para um usuário existente.
// Deixei o nome e email para validação, porém acho que seria melhor colocar só o email ou o nome para mais agilidade.
export const UserSchema = z.object({
  name: z.string().min(1, "Digite seu nome"),
  email: z
    .string({
      required_error: "Digite seu email",
      invalid_type_error: "Email inválido",
    })
    .email(),
  password: z.string({
    required_error: "Digite sua senha",
    invalid_type_error: "Senha inválida",
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Tipos derivados dos esquemas
export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type UserType = z.infer<typeof UserSchema>;
