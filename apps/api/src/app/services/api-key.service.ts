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

export async function findAllApiKeys() {
  const apiKeys = await prismaSingleton.apiKey.findMany({
    omit: { keyHash: true },
  });
  return apiKeys;
}

export async function revokeApiKey(id: string) {
  const apiKey = await prismaSingleton.apiKey.findUnique({ where: { id } });

  if (!apiKey) {
    throw new Error(`Api Key with ${id} ID not found.`);
  }

  if (apiKey.revokedAt) {
    throw new Error(`Api Key with ${id} ID is already revoked.`);
  }

  await prismaSingleton.apiKey.update({
    where: { id: apiKey.id },
    data: { revokedAt: new Date() },
  });
}
