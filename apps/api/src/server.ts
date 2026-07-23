import { createApp } from "./app.ts";

const app = createApp();

try {
  await app.listen({
    host: '0.0.0.0',
    port: 3000,
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
