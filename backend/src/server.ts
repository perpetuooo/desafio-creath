import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fjwt from "@fastify/jwt";
import cors from "@fastify/cors";
import barberRoutes from "./modules/barber/barber.routes";
import userRoutes from "./modules/user/user.routes";
import { PrismaClient } from "@prisma/client";
import cookies, { FastifyCookieOptions } from "@fastify/cookie";


const prisma = new PrismaClient();

const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

app.register(cors, {
  origin: 'http://localhost:5173', 
  credentials: true, 
});
app.register(fjwt, {
  secret: process.env.FJWT_SECRET || "JWTSECRET",
});
app.register(cookies, {
  secret: process.env.COOKIES_SECRET || "COOKIESSECRET",
} as FastifyCookieOptions)

// Lógica de autenticação do usuário: Verifica se quem acessa a rota está logado.
app.decorate('authenticator', async (req: FastifyRequest, rep: FastifyReply) => {
  const token = req.cookies.access_token;
  if (!token) {
    return rep.status(401).send({ error: "Autenticação falhou" });
  }

  try {
    req.user = req.jwt.verify(token);
  } catch (error) {
    console.error(error);
    return rep.status(401).send(error);
  }
});

// Lógica de autenticação do barbeiro: Verifica se quem acessa a rota é um barbeiro.
app.decorate('isBarber', async (req: FastifyRequest, rep: FastifyReply) => {
  if (!req.baber) {
    return rep.status(403).send({ error: "Acesso negado." });
  }
});

app.addHook("preHandler", (req, rep, done) => {
  req.jwt = app.jwt;
  return done();
});

async function main() {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(barberRoutes, { prefix: "api/barber" });
  app.register(userRoutes, { prefix: "api/user" });

  // app.get('/', (req: FastifyRequest, rep: FastifyReply) => {
  //   rep.send({ message: "Barba, Cabelo e Bigode." });
  // });

  const port = process.env.PORT ? parseInt(process.env.PORT) : 8081;
  const host = process.env.HOST || "0.0.0.0";

  await app
    .listen({
      port: port,
      host: host,
    })
    .then(() => {
      console.log("Server running at port " + port);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

main();

// Espera o banco de dados terminar suas ações para fechar o servidor.
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit();
});
