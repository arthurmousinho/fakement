import { createApiKeySchema } from "../schemas/api-key.schema.ts";
import { createApiKey } from "../services/api-key.service.ts";
import type { FastifyInstance } from "fastify";

export async function apiKeyRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const input = createApiKeySchema.parse(request.body);
    const apiKey = await createApiKey(input);
    return reply.status(201).send(apiKey);
  });
}
