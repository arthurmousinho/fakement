import cors from "@fastify/cors";
import { ZodError } from "zod";
import { createApp } from "./app.ts";
import { apiKeyRoutes } from "./app/routes/api-key.routes.ts";
import { env } from "./config/env.ts";
import { HttpError } from "./common/http-error.ts";
import { paymentRoutes } from "./app/routes/payment.routes.ts";
import { webhookEndpointRoutes } from "./app/routes/webhook-endpoint.routes.ts";
import { paymentEventRoutes } from "./app/routes/payment-event.routes.ts";
import { webhookDeliveryRoutes } from "./app/routes/webhook-delivery.routes.ts";
import { checkoutRoutes } from "./app/routes/checkout.routes.ts";

export const appSingleton = createApp();

// CORS
appSingleton.register(cors, {
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  origin: env.WEB_URL,
});

// Errors
appSingleton.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: "BAD_REQUEST",
      code: 400,
      message: error.issues.map((issue) => issue.message),
    });
  }

  if (error instanceof HttpError) {
    return reply.status(error.statusCode).send({
      error: error.error,
      code: error.statusCode,
      message: error.message,
    });
  }

  request.log.error(error);

  return reply.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Unexpected error",
  });
});

// Mock Webhook Handler
appSingleton.post("/webhooks/mock/handler", async (request, reply) => {
  console.log("Webhook received");
  console.log("Body:", request.body);
  console.log("Signature:", request.headers["x-signature"]);
  return reply.status(200).send();
});

// Routes
appSingleton.register(apiKeyRoutes, { prefix: "/api-keys" });
appSingleton.register(paymentRoutes, { prefix: "/payments" });
appSingleton.register(webhookEndpointRoutes, { prefix: "/webhooks/endpoints" });
appSingleton.register(webhookDeliveryRoutes, {
  prefix: "/webhooks/deliveries",
});
appSingleton.register(paymentEventRoutes, { prefix: "/events" });
appSingleton.register(checkoutRoutes, { prefix: "/checkouts" });

try {
  await appSingleton.listen({
    host: "0.0.0.0",
    port: env.PORT,
  });
} catch (error) {
  appSingleton.log.error(error);
  process.exit(1);
}
