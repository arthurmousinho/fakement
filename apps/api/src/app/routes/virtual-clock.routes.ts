import type { FastifyInstance } from "fastify";
import { virtualClockService } from "../services/virtual-clock.service.ts";

export async function virtualClockRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const currentDateTime = virtualClockService.now();
    return reply.status(200).send({ currentDateTime });
  });
}
