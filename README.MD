![fakement-banner](./.github/banner.png)

# Fakement

> A local-first fake payment gateway for developing and testing payment integrations.

Fakement is an open-source REST API that simulates the behavior of a payment gateway, allowing developers to build and test payment integrations without relying on external providers, internet connectivity, or sandbox environments.

Inspired by tools like Mailcatcher, Fakement provides a predictable and fully local environment for simulating payment flows, webhooks, and transaction lifecycles.

## Motivation

Integrating with payment providers during development can be slow and frustrating.

- Requires API keys
- Depends on internet connectivity
- Sandbox environments are often unstable
- Different providers expose different APIs
- Difficult to reproduce edge cases

Fakement solves these problems by providing a local payment gateway that behaves like a real one.

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
