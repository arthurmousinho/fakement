import { UnauthorizedError } from "../../common/http-error.ts";
import { createPaymentSchema } from "../schemas/payment.schema.ts";
import { paymentService } from "../services/payment.service.ts";
import type { FastifyInstance } from "fastify";

export async function paymentRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const payments = await paymentService.findAll();
    return reply.status(200).send(payments);
  });

  app.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const payment = await paymentService.findById(id);
    return reply.status(200).send(payment);
  });

  app.post("/", async (request, reply) => {
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Api Key is missing.");
    }

    const apiKey = authorization.slice("Bearer ".length);
    const input = createPaymentSchema.parse(request.body);
    const payment = await paymentService.create(apiKey, input);

    return reply.status(201).send(payment);
  });
}
