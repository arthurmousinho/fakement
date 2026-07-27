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
