import type { FastifyInstance } from "fastify";
import { webhookDeliveryService } from "../services/webhook-delivery.service.ts";

export async function webhookDeliveryRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const endpoints = await webhookDeliveryService.findAll();
    return reply.status(200).send(endpoints);
  });
}
