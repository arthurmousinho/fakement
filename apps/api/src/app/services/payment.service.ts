import { ConflictError } from "../../common/http-error.ts";
import { prismaSingleton } from "../../config/prisma.ts";
import type { CreatePaymentInput } from "../schemas/payment.schema.ts";
import { apiKeyService } from "./api-key.service.ts";

async function create(apiKey: string, input: CreatePaymentInput) {
  const validatedApiKey = await apiKeyService.validate(apiKey);

  if (input.idempotencyKey) {
    const paymentWithIdempotencyKey = await prismaSingleton.payment.findUnique({
      where: {
        apiKeyId_idempotencyKey: {
          apiKeyId: validatedApiKey.id,
          idempotencyKey: input.idempotencyKey,
        },
      },
    });

    if (paymentWithIdempotencyKey) {
      return paymentWithIdempotencyKey;
    }
  }

  if (input.externalId) {
    const paymentWithExternalId = await prismaSingleton.payment.findUnique({
      where: {
        apiKeyId_externalId: {
          externalId: input.externalId,
          apiKeyId: validatedApiKey.id,
        },
      },
    });

    if (paymentWithExternalId) {
      throw new ConflictError(
        `Payment with external ID ${input.externalId} already created.`,
      );
    }
  }

  const payment = await prismaSingleton.payment.create({
    data: {
      amountInCents: input.amountInCents,
      currency: input.currency,
      method: input.method,
      idempotencyKey: input.idempotencyKey ?? null,
      externalId: input.externalId ?? null,
      description: input.description ?? null,
      apiKeyId: validatedApiKey.id,
      status: "CREATED",
    },
  });
  return payment;
}

async function findAll() {
  const payments = await prismaSingleton.payment.findMany();
  return payments;
}

export const paymentService = {
  create,
  findAll,
};
