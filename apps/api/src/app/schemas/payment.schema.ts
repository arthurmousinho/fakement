import { z } from "zod";
import {
  PaymentCurrency,
  PaymentMethod,
} from "../../../generated/prisma/enums.ts";

export const createPaymentSchema = z.object({
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
  externalId: z
    .string({ error: "O identificador externo deve ser um texto." })
    .trim()
    .max(255, {
      error: "O identificador externo deve ter no máximo 255 caracteres.",
    })
    .optional(),
  idempotencyKey: z
    .string({ error: "A chave de idempotência deve ser um texto." })
    .trim()
    .max(255, {
      error: "A chave de idempotência deve ter no máximo 255 caracteres.",
    })
    .optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
