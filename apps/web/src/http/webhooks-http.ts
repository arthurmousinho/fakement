import { api } from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import type { PaymentEventType } from "./payment-events-http";

export type WebhookEndpoint = {
  id: string;
  url: string;
  enabled: boolean;
  events: PaymentEventType[];
  apiKeyId: string;
  createdAt: string;
  updatedAt: string;
};

export function FindAllWebhookEndpointsRequest() {
  return useQuery({
    queryKey: ["webhooks", "endpoints"],
    queryFn: async () => {
      const request = await api.get("webhooks/endpoints");
      return await request.json<WebhookEndpoint[]>();
    },
  });
}
