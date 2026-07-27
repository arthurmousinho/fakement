import { z } from "zod";
import { PaymentEventType } from "../../../generated/prisma/enums.ts";

const paymentEventsSchema = z
  .array(z.enum(PaymentEventType), {
    message: "Os eventos devem ser uma lista válida.",
  })
  .min(1, "Selecione pelo menos um evento.")
  .refine(
    (events) => new Set(events).size === events.length,
    "Não é permitido informar eventos duplicados.",
  );

export const createWebhookEndpointSchema = z.object({
  url: z
    .string({ message: "A URL deve ser um texto." })
    .trim()
    .url("A URL informada é inválida.")
    .max(2048, "A URL deve possuir no máximo 2048 caracteres."),
  events: paymentEventsSchema,
});

export type CreateWebhookEndpointInput = z.infer<
  typeof createWebhookEndpointSchema
>;

export const updateWebhookEndpointSchema = z.object({
  url: z
    .string({ message: "A URL deve ser um texto." })
    .trim()
    .url("A URL informada é inválida.")
    .max(2048, "A URL deve possuir no máximo 2048 caracteres.")
    .optional(),
  enabled: z
    .boolean({
      message: "O campo enabled deve ter um valor booleano.",
    })
    .optional(),
  events: paymentEventsSchema.optional(),
});

export type UpdateWebhookEndpointInput = z.infer<
  typeof updateWebhookEndpointSchema
>;
