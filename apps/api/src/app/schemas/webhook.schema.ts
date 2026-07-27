import { z } from "zod";

export const createWebhookEndpointSchema = z.object({
  url: z
    .string({ message: "A URL deve ser um texto." })
    .trim()
    .url("A URL informada é inválida.")
    .max(2048, "A URL deve possuir no máximo 2048 caracteres."),
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
      message: "O campo enabled deve ter um valor booleano",
    })
    .optional(),
});

export type UpdateWebhookEndpointInput = z.infer<
  typeof updateWebhookEndpointSchema
>;
