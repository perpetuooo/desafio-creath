import { FastifyInstance } from "fastify";
import { getBarbers, getUsers } from "./barber.controller";

export default async function barberRoutes(app: FastifyInstance) {
    app.get(
        '/babers',
        getBarbers
    ),

    app.get(
        '/users',
        getUsers
    )
}