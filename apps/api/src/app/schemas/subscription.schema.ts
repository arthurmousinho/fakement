import z from "zod";
import {
  BillingInterval,
  PaymentCurrency,
  PaymentMethod,
  SubscriptionStatus,
} from "../../../generated/prisma/enums.ts";

export const createSubscriptionSchema = z.object({
  amountInCents: z.coerce
    .number({ error: "O valor deve ser um número." })
    .int({ error: "O valor deve ser um número inteiro." })
    .positive({ error: "O valor deve ser maior que zero." }),
  currency: z.enum(PaymentCurrency, { error: "Moeda inválida." }),
  method: z.enum(PaymentMethod, { error: "Método de pagamento inválido." }),
  description: z
    .string({ error: "A descrição deve ser um texto." })
    .trim()
    .max(255, { error: "A descrição deve ter no máximo 255 caracteres." })
    .optional(),
  interval: z.enum(BillingInterval, { message: "Intervalo inválido" }),
});

export type CreateSubscriptionSchema = z.infer<typeof createSubscriptionSchema>;
