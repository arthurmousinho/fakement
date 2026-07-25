import crypto from "node:crypto";
import { prismaSingleton } from "../../config/prisma.ts";
import type { CreateApiKeyInput } from "../schemas/api-key.schema.ts";

export async function createApiKey(input: CreateApiKeyInput) {
  const rawKey = crypto.randomBytes(32).toString("hex");
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

  const createdApiKey = await prismaSingleton.apiKey.create({
    data: {
      name: input.name,
      keyHash,
    },
  });

  return {
    id: createdApiKey.id,
    name: createdApiKey.name,
    rawKey,
  };
}
