import { PrismaClient } from "@prisma/client/extension";

export const prismaSingleton = new PrismaClient();
