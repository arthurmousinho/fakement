import type { FastifyInstance } from "fastify";
import { paymentEventService } from "../services/payment-event.service.ts";

export async function paymentEventRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const events = await paymentEventService.findAll();
    return reply.status(200).send(events);
  });
}
