import { JWT } from "@fastify/jwt"

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
    user: UserPayload
    baber: BarberPayload
  }
  
  interface FastifyInstance {
    authenticator: any
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload
    barber: BarberPayload
  }

}

type UserPayload = {
  id: string
  name: string
  phone: string
};

type BarberPayload = {
    id: string
    name: string
    phone: string
}