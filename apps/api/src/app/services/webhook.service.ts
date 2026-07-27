import { randomBytes } from "node:crypto";
import type { CreateWebhookEndpointInput } from "../schemas/webhook.schema.ts";
import { prismaSingleton } from "../../config/prisma.ts";
import { apiKeyService } from "./api-key.service.ts";

async function createEndpoint(
  apiKey: string,
  input: CreateWebhookEndpointInput,
) {
  const validatedApiKey = await apiKeyService.validate(apiKey);
  const webhookSecret = `whsec_${randomBytes(32).toString("hex")}`;

  const webhookEndpoint = await prismaSingleton.webhookEndpoint.create({
    data: {
      url: input.url,
      secret: webhookSecret,
      apiKeyId: validatedApiKey.id,
    },
  });

  return webhookEndpoint;
}

async function findAllEndpoints() {
  return await prismaSingleton.webhookEndpoint.findMany({
    omit: { secret: true },
  });
}

export const webhookService = {
  createEndpoint,
  findAllEndpoints,
};
