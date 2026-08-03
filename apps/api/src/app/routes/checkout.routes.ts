import type { FastifyInstance } from "fastify";
import { checkoutService } from "../services/checkout.service.ts";

export async function checkoutRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const checkouts = await checkoutService.findAll();
    return reply.status(200).send(checkouts);
  });
}
