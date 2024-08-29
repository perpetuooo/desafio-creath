import bcrypt from "bcrypt";

// Hasheamento de senha.
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Compara a senha digitada com o hash do banco de dados.
export async function comparePassword(
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatch;
}
