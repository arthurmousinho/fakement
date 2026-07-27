import { UnauthorizedError } from "../../common/http-error.ts";
import type { FastifyInstance } from "fastify";
import {
  createWebhookEndpointSchema,
  updateWebhookEndpointSchema,
} from "../schemas/webhook.schema.ts";
import { webhookService } from "../services/webhook.service.ts";

export async function webhookRoutes(app: FastifyInstance) {
  app.get("/endpoints", async (request, reply) => {
    const endpoints = await webhookService.findAllEndpoints();
    return reply.status(200).send(endpoints);
  });

  app.get("/endpoints/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const endpoint = await webhookService.findEndpointById(id);
    return reply.status(200).send(endpoint);
  });

  app.post("/endpoints", async (request, reply) => {
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Api Key is missing.");
    }

    const apiKey = authorization.slice("Bearer ".length);
    const input = createWebhookEndpointSchema.parse(request.body);
    const endpoint = await webhookService.createEndpoint(apiKey, input);

    return reply.status(201).send(endpoint);
  });

  app.patch("/endpoints/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const input = updateWebhookEndpointSchema.parse(request.body);
    const updatedEndpoint = await webhookService.updateEndpoint(id, input);
    return reply.status(200).send(updatedEndpoint);
  });

  app.delete("/endpoints/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    await webhookService.deleteEndpoint(id);
    return reply.status(204).send();
  });
}
