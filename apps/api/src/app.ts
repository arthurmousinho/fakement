import Fastify from "fastify";

export function createApp() {
  const app = Fastify({
    logger: true,
  });

  app.get("/", async () => {
    return {
      message: "Welcome to @mockment/api",
      now: new Date().toISOString(),
      status: "ok",
    };
  });

  return app;
}
