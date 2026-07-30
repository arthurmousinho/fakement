import { randomBytes, createHmac } from "node:crypto";
import type {
  CreateWebhookEndpointInput,
  UpdateWebhookEndpointInput,
} from "../schemas/webhook.schema.ts";
import { prismaSingleton } from "../../config/prisma.ts";
import { apiKeyService } from "./api-key.service.ts";
import { NotFoundError } from "../../common/http-error.ts";
import type {
  PaymentEvent,
  PaymentEventType,
  WebhookEndpoint,
} from "../../../generated/prisma/client.ts";
import { paymentService } from "./payment.service.ts";

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
      ...(input.enabled !== undefined && { enabled: input.enabled }),
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

async function revokeEndpointSecret(endpointId: string) {
  const endpoint = await findEndpointById(endpointId);
  const newSecret = generateSecret();
  return await prismaSingleton.webhookEndpoint.update({
    where: { id: endpoint.id },
    data: { secret: newSecret },
  });
}

async function findEnabledEndpointsByApiKeyId(apiKeyId: string) {
  return await prismaSingleton.webhookEndpoint.findMany({
    where: { apiKeyId, enabled: true },
  });
}

async function send(endpoint: WebhookEndpoint, paymentEvent: PaymentEvent) {
  const delivery = await prismaSingleton.webhookDelivery.create({
    data: {
      endpointId: endpoint.id,
      paymentEventId: paymentEvent.id,
      status: "PENDING",
    },
  });

  const body = JSON.stringify({
    id: paymentEvent.id,
    type: paymentEvent.type,
    createdAt: paymentEvent.createdAt,
    data: paymentEvent.payload,
  });

  const signature = createHmac("sha256", endpoint.secret)
    .update(body)
    .digest("hex");

  try {
    const response = await fetch(endpoint.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Signature": signature,
      },
      body,
    });

    await prismaSingleton.webhookDelivery.update({
      where: { id: delivery.id },
      data: {
        status: response.ok ? "SUCCESS" : "FAILED",
        statusCode: response.status,
        deliveredAt: new Date(),
        error: response.ok
          ? null
          : `Request returned status ${response.status}`,
      },
    });
  } catch (err) {
    await prismaSingleton.webhookDelivery.update({
      where: { id: delivery.id },
      data: {
        status: "FAILED",
        deliveredAt: new Date(),
        error: err instanceof Error ? err.message : "Unknown error",
      },
    });
  }
}

async function dispatch(paymentEvent: PaymentEvent) {
  const payment = await paymentService.findById(paymentEvent.paymentId);
  const endpoints = await findEnabledEndpointsByApiKeyId(payment.apiKeyId);

  for (const endpoint of endpoints) {
    const events = endpoint.events as PaymentEventType[];
    if (!events.includes(paymentEvent.type)) continue;
    await send(endpoint, paymentEvent);
  }
}

export const webhookService = {
  createEndpoint,
  findAllEndpoints,
  findEndpointById,
  updateEndpoint,
  deleteEndpoint,
  revokeEndpointSecret,
  dispatch,
};
