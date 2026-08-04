import { prismaSingleton } from "../../config/prisma.ts";
import { apiKeyService } from "./api-key.service.ts";
import type { CreateSubscriptionSchema } from "../schemas/subscription.schema.ts";
import type {
  BillingInterval,
  SubscriptionStatus,
} from "../../../generated/prisma/enums.ts";
import { BadRequestError, NotFoundError } from "../../common/http-error.ts";

function calculateNextBillingDate(interval: BillingInterval) {
  const now = new Date();
  let nextBillingAt: Date;

  switch (interval) {
    case "DAY":
      nextBillingAt = new Date(now.setDate(now.getDate() + 1));
      break;
    case "WEEK":
      nextBillingAt = new Date(now.setDate(now.getDate() + 7));
      break;
    case "MONTH":
      nextBillingAt = new Date(now.setMonth(now.getMonth() + 1));
      break;
    case "YEAR":
      nextBillingAt = new Date(now.setFullYear(now.getFullYear() + 1));
      break;
  }

  return nextBillingAt;
}

async function create(apiKey: string, input: CreateSubscriptionSchema) {
  const validatedApiKey = await apiKeyService.validate(apiKey);
  return await prismaSingleton.subscription.create({
    data: {
      apiKeyId: validatedApiKey.id,
      amountInCents: input.amountInCents,
      currency: input.currency,
      method: input.method,
      description: input.description ?? null,
      interval: input.interval,
      intervalCount: 1,
      status: "ACTIVE",
      nextBillingAt: calculateNextBillingDate(input.interval),
    },
  });
}

async function findAll() {
  return await prismaSingleton.subscription.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function findById(id: string) {
  const subscription = await prismaSingleton.subscription.findUnique({
    where: { id },
  });

  if (!subscription) {
    throw new NotFoundError(`Subscription with ID ${id} was not found.`);
  }

  return subscription;
}

function validateStatusTransition(
  currentStatus: SubscriptionStatus,
  newStatus: SubscriptionStatus,
) {
  const validTransitions: Record<SubscriptionStatus, SubscriptionStatus[]> = {
    ACTIVE: ["PAUSED", "CANCELED"],
    PAUSED: ["ACTIVE", "CANCELED"],
    CANCELED: [],
  };
  const allowed = validTransitions[currentStatus];
  if (!allowed.includes(newStatus)) {
    throw new BadRequestError(
      `Cannot change subscription status from ${currentStatus} to ${newStatus}.`,
    );
  }
}

async function changeStatus(id: string, newStatus: SubscriptionStatus) {
  const subscription = await findById(id);
  validateStatusTransition(subscription.status, newStatus);
  return await prismaSingleton.subscription.update({
    where: { id: subscription.id },
    data: { status: newStatus },
  });
}

export const subscriptionService = {
  create,
  findAll,
  changeStatus,
};
