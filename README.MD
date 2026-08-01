![Banner](./.github/banner.png)

# Fakement

> A local-first fake payment gateway for developing and testing payment integrations.

Fakement is an open-source REST API that **simulates** the behavior of a payment gateway, allowing developers to build and test payment integrations without relying on external providers, internet connectivity, or sandbox environments.

Inspired by tools like Mailcatcher, Fakement provides a predictable and fully local environment for simulating payment flows, webhooks, and transaction lifecycles.

## Motivation

Integrating with payment providers during development can be slow and frustrating.

- Requires API keys
- Depends on internet connectivity
- Sandbox environments are often unstable
- Different providers expose different APIs
- Difficult to reproduce edge cases

Fakement solves these problems by providing a local payment gateway that behaves like a real one.

## Project Status

> **⚠️ Fakement is under development.**

The project is functional but still evolving. Core features are being implemented incrementally, and breaking changes may occur until the first stable release.

| Feature            | Status |
| ------------------ | :----: |
| API Keys           |   ✅   |
| Payment API        |   🚧   |
| Payment Simulation |   🚧   |
| Webhooks           |   ✅   |
| Event Store        |   ✅   |
| Dashboard          |   🚧   |
| Refunds            |   📋   |
| Documentation      |   🚧   |
| CI/CD              |   📋   |

✅ **Implemented** | 🚧 **In Progress** | 📋 **Planned**

## Architecture

![Architecture](./.github/architecture.png)

Fakement is designed to fit into your existing application like a real payment provider. Instead of communicating with Stripe, Mercado Pago, Adyen, or another external gateway, your backend sends payment requests to a local Fakement instance.

The flow is straightforward:

1. The user initiates a payment from your application.
2. Your frontend sends the request to your backend.
3. Your backend calls the Fakement REST API.
4. Fakement simulates the payment lifecycle and stores the transaction locally.
5. If configured, Fakement sends webhook events back to your application, allowing you to test asynchronous payment flows exactly as they would happen in production.

Because everything runs locally, developers can build, debug, and reproduce payment scenarios without internet connectivity, sandbox accounts, or third-party dependencies.

## Tech Stack

![fakement-banner](./.github/tech-stack.png)

| Technology       | Why it's used                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **React**        | Powers the dashboard used to manage API keys, inspect payments, configure webhooks, and monitor simulated transactions. |
| **Tailwind CSS** | Utility-first CSS framework used to build a modern, responsive, and maintainable interface.                             |
| **shadcn/ui**    | Provides accessible, reusable UI components built on Radix UI, enabling a consistent developer experience.              |
| **Node.js**      | JavaScript runtime that powers the Fakement backend and its high-performance REST API.                                  |
| **Fastify**      | Fast and lightweight web framework responsible for routing, validation, plugins, and HTTP handling.                     |
| **Zod**          | Runtime schema validation and TypeScript type inference for requests, responses, configuration and UI forms.            |
| **Docker**       | Makes Fakement easy to run locally with a consistent environment across operating systems.                              |
| **Prisma ORM**   | Type-safe ORM used for database access, migrations, and data modeling.                                                  |
| **MySQL**        | Stores payments, API keys, webhook configurations, events, and other persistent application data.                       |

## Installation

Before getting started, make sure you have the following installed:

- **Node.js** 22 or later
- **pnpm** 10+
- **Docker** and Docker Compose
- **Git**

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/arthurmousinho/fakement.git
cd fakement
```

Install all workspace dependencies:

```bash
pnpm install
```

Fakement uses MySQL running inside Docker. Start the required containers before running the application:

```bash
docker compose up -d
```

Create your local environment configuration by copying the example file:

```bash
cp .env.example .env
```

The default configuration should work for most development environments, but you can adjust the variables if necessary.

Next, create the database schema using Prisma migrations:

```bash
pnpm prisma migrate dev
```

Finally, start the development environment:

```bash
pnpm dev
```

After everything is running, the services will be available at:

| Service       | URL                   |
| ------------- | --------------------- |
| REST API      | http://localhost:8080 |
| Web Dashboard | http://localhost:5173 |
