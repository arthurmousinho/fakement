import { z } from "zod";

export const createApiKeySchema = z.object({
  name: z
    .string({ message: "O nome deve ser um texto" })
    .trim()
    .min(3, "O nome deve possuir pelo menos 3 caracteres.")
    .max(100, "O nome deve possuir no máximo 100 caracteres."),
});

export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
