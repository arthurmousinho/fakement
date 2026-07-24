import { createApp } from "./app.ts";
import { env } from "./config/env.ts";

const app = createApp();

try {
  await app.listen({
    host: "0.0.0.0",
    port: env.PORT,
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
