import { randomBytes } from "node:crypto";
import type {
  CreateWebhookEndpointInput,
  UpdateWebhookEndpointInput,
} from "../schemas/webhook.schema.ts";
import { prismaSingleton } from "../../config/prisma.ts";
import { apiKeyService } from "./api-key.service.ts";
import { NotFoundError } from "../../common/http-error.ts";
import type { PaymentEventType } from "../../../generated/prisma/enums.ts";
import type { WebhookEndpoint } from "../../../generated/prisma/client.ts";

function generateSecret() {
  return `whsec_${randomBytes(32).toString("hex")}`;
}

async function createEndpoint(
  apiKey: string,
  input: CreateWebhookEndpointInput,
) {
  const validatedApiKey = await apiKeyService.validate(apiKey);
  return await prismaSingleton.webhookEndpoint.create({
    data: {
      url: input.url,
      events: input.events,
      secret: generateSecret(),
      apiKeyId: validatedApiKey.id,
    },
  });
}

async function findAllEndpoints() {
  return await prismaSingleton.webhookEndpoint.findMany({
    omit: { secret: true },
    orderBy: { createdAt: "desc" },
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

async function updateEndpoint(
  endpointId: string,
  input: UpdateWebhookEndpointInput,
) {
  const endpoint = await findEndpointById(endpointId);
  return await prismaSingleton.webhookEndpoint.update({
    where: { id: endpoint.id },
    data: {
      ...(input.url !== undefined && { url: input.url }),
      ...(input.events !== undefined && {
        events: input.events,
      }),
    },
    omit: { secret: true },
  });
}

async function deleteEndpoint(endpointId: string) {
  const endpoint = await findEndpointById(endpointId);
  await prismaSingleton.webhookEndpoint.delete({
    where: { id: endpoint.id },
  });
}

async function rotateEndpointSecret(endpointId: string) {
  const endpoint = await findEndpointById(endpointId);
  const secret = generateSecret();
  await prismaSingleton.webhookEndpoint.update({
    where: { id: endpoint.id },
    data: { secret },
  });
  return { secret };
}

async function findAllEndpointsSubscribedToEvent(event: PaymentEventType) {
  return await prismaSingleton.$queryRaw<WebhookEndpoint[]>`
    SELECT *
    FROM webhook_endpoints
    WHERE JSON_CONTAINS(events, JSON_ARRAY(${event}))
  `;
}

export const webhookService = {
  createEndpoint,
  findAllEndpoints,
  findEndpointById,
  updateEndpoint,
  deleteEndpoint,
  rotateEndpointSecret,
  findAllEndpointsSubscribedToEvent,
};
