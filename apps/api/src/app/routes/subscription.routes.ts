import { UnauthorizedError } from "../../common/http-error.ts";
import { createSubscriptionSchema } from "../schemas/subscription.schema.ts";
import type { FastifyInstance } from "fastify";
import { subscriptionService } from "../services/subscription.service.ts";

export async function subcriptionRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const subscriptions = await subscriptionService.findAll();
    return reply.status(200).send(subscriptions);
  });

  app.post("/", async (request, reply) => {
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Api Key is missing.");
    }

    const apiKey = authorization.slice("Bearer ".length);
    const input = createSubscriptionSchema.parse(request.body);
    const subscription = await subscriptionService.create(apiKey, input);

    return reply.status(201).send(subscription);
  });
}
