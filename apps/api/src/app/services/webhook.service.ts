import { randomBytes } from "node:crypto";
import type { CreateWebhookEndpointInput } from "../schemas/webhook.schema.ts";
import { prismaSingleton } from "../../config/prisma.ts";
import { apiKeyService } from "./api-key.service.ts";
import { NotFoundError } from "../../common/http-error.ts";

async function createEndpoint(
  apiKey: string,
  input: CreateWebhookEndpointInput,
) {
  const validatedApiKey = await apiKeyService.validate(apiKey);
  const secret = `whsec_${randomBytes(32).toString("hex")}`;

  const endpoint = await prismaSingleton.webhookEndpoint.create({
    data: {
      url: input.url,
      secret,
      apiKeyId: validatedApiKey.id,
    },
  });

  return endpoint;
}

async function findAllEndpoints() {
  return await prismaSingleton.webhookEndpoint.findMany({
    omit: { secret: true },
  });
}

async function findEndpointById(endpointId: string) {
  const endpoint = await prismaSingleton.webhookEndpoint.findUnique({
    where: { id: endpointId },
  });

  if (!endpoint) {
    throw new NotFoundError(
      `Webhook endpoint with ID ${endpointId} was not found.`,
    );
  }

  return endpoint;
}

export const webhookService = {
  createEndpoint,
  findAllEndpoints,
  findEndpointById,
};
