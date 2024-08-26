import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fjwt from "@fastify/jwt";
import cors from "@fastify/cors";
import barberRoutes from "./modules/barber/barber.routes";
import userRoutes from "./modules/user/user.routes";
import prisma from "./utils/prisma";
import cookies, { FastifyCookieOptions } from "@fastify/cookie";

const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

app.register(cors, {
  origin: "*",
});
app.register(fjwt, {
  secret: process.env.FJWT_SECRET || "JWTSECRET",
});
app.register(cookies, {
  secret: process.env.COOKIES_SECRET || "COOKIESSECRET",
} as FastifyCookieOptions)


app.decorate('authenticator', async (req: FastifyRequest, rep: FastifyReply) => {
  const token = req.cookies.acess_token

  if (!token) {
    return rep.status(401).send({ error: "Autenticação falhou" })
  }

  try {
    req.user = req.jwt.verify(token)
    
  } catch(error) {
    console.error(error)
    return rep.status(401).send(error)
  }
})

app.decorate('isBarber', async (req: FastifyRequest, rep: FastifyReply) => {
  if (!req.baber) {
    return rep.status(403).send({ error: "Acesso negado." })
  }
})

app.addHook("preHandler", (req, rep, done) => {
  req.jwt = app.jwt;
  return done();
});

async function main() {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(barberRoutes, { prefix: "api/barber" });
  app.register(userRoutes, { prefix: "api/user" });

  app.get('/', (req: FastifyRequest, rep: FastifyReply) => {
    rep.send({ message: "Barba, Cabelo e Bigode." });
  });

  const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
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

process.on("SIGINT", async () => {
  await prisma.$disconnect()
  process.exit();
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect
  process.exit();
});
