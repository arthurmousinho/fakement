import type { FastifyInstance } from "fastify";
import { virtualClockService } from "../services/virtual-clock.service.ts";
import { advanceVirtualClockSchema } from "../schemas/virtual-clock.schema.ts";

export async function virtualClockRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const currentDateTime = virtualClockService.now();
    return reply.status(200).send({ currentDateTime });
  });

  app.post("/advance", async (request, reply) => {
    const input = advanceVirtualClockSchema.parse(request.body);
    const currentDateTime = virtualClockService.advance(input);
    return reply.status(200).send({ currentDateTime });
  });
}
