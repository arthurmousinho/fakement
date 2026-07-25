import { createApiKeySchema } from "../schemas/api-key.schema.ts";
import {
  createApiKey,
  deleteApiKey,
  findAllApiKeys,
  revokeApiKey,
} from "../services/api-key.service.ts";
import type { FastifyInstance } from "fastify";

export async function apiKeyRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const apiKeys = await findAllApiKeys();
    return reply.status(200).send(apiKeys);
  });

  app.post("/", async (request, reply) => {
    const input = createApiKeySchema.parse(request.body);
    const apiKey = await createApiKey(input);
    return reply.status(201).send(apiKey);
  });

  app.patch("/:id/revoke", async (request, reply) => {
    const { id } = request.params as { id: string };
    await revokeApiKey(id);
    return reply.status(204).send();
  });

  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    await deleteApiKey(id);
    return reply.status(204).send();
  });
}
