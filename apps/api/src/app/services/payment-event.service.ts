import { prismaSingleton } from "../../config/prisma.ts";
import { webhookService } from "./webhook.service.ts";
import type { PaymentEventType } from "../../../generated/prisma/client.ts";

async function save(input: {
  type: PaymentEventType;
  paymentId: string;
  payload?: unknown;
}) {
  const event = await prismaSingleton.paymentEvent.create({
    data: {
      type: input.type,
      paymentId: input.paymentId,
      payload: input.payload ?? {},
    },
  });
  await webhookService.dispatch(event);
  return event;
}

async function findAll() {
  return await prismaSingleton.paymentEvent.findMany({
    orderBy: { createdAt: "desc" },
    omit: { payload: true },
  });
}

export const paymentEventService = {
  save,
  findAll,
};
