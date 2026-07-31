import { createHmac } from "node:crypto";
import { prismaSingleton } from "../../config/prisma.ts";
import type {
  PaymentEvent,
  PaymentEventType,
  WebhookEndpoint,
} from "../../../generated/prisma/client.ts";
import { webhookEndpointService } from "./webhook-endpoint.service.ts";

async function findAll() {
  return await prismaSingleton.webhookDelivery.findMany();
}

async function findAllByEndpointId(endpointId: string) {
  return await prismaSingleton.webhookDelivery.findMany({
    where: { endpointId },
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
  const subscribedEndpoints =
    await webhookEndpointService.findAllSubscribedToEvent(paymentEvent.type);

  for (const endpoint of subscribedEndpoints) {
    const events = endpoint.events as PaymentEventType[];
    if (!events.includes(paymentEvent.type)) continue;
    await send(endpoint, paymentEvent);
  }
}

export const webhookDeliveryService = {
  send,
  dispatch,
  findAll,
  findAllByEndpointId,
};
