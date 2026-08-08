import { env } from "../../config/env.ts";
import { prismaSingleton } from "../../config/prisma.ts";
import type { GenerateCheckoutLinkInput } from "../schemas/checkout.schema.ts";
import { paymentService } from "./payment.service.ts";

function buildCheckoutLink(checkoutId: string) {
  return `${env.WEB_URL}/checkout/${checkoutId}`;
}

async function generateLink(input: GenerateCheckoutLinkInput) {
  const payment = await paymentService.findById(input.paymentId);
  if (payment.status !== "CREATED") {
    throw new Error("Only payment in CREATED state can be checked out.");
  }

  const defaultSuccessLink = `${env.WEB_URL}/success-checkout`;
  const defaultCancelLink = `${env.WEB_URL}/cancel-checkout`;

  const checkout = await prismaSingleton.checkout.create({
    data: {
      apiKeyId: input.apiKeyId,
      paymentId: input.paymentId,
      successUrl: input.successUrl ?? defaultSuccessLink,
      cancelUrl: input.cancelUrl ?? defaultCancelLink,
    },
  });

  return buildCheckoutLink(checkout.id);
}

async function getGeneratedLinkByPaymentId(paymentId: string) {
  const checkout = await prismaSingleton.checkout.findFirst({
    where: { paymentId },
  });
  return checkout ? buildCheckoutLink(checkout.id) : null;
}

async function findAll() {
  return await prismaSingleton.checkout.findMany();
}

async function getDetails(id: string) {
  return await prismaSingleton.checkout.findUnique({
    where: { id },
    include: { payment: true },
  });
}

export const checkoutService = {
  generateLink,
  getGeneratedLinkByPaymentId,
  findAll,
  getDetails,
};
