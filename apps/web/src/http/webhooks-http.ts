import { api, apiErrorHandler } from "@/lib/ky";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { PaymentEventType } from "./payment-events-http";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";

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

export type CreateWebhookEndpointRequestData = {
  url: string;
  events: PaymentEventType[];
  apiKey: string;
};

export function CreateWebhookEndpointRequest() {
  return useMutation({
    mutationFn: async (data: CreateWebhookEndpointRequestData) => {
      const headers = { Authorization: `Bearer ${data.apiKey}` };
      const body = { url: data.url, events: data.events };
      await api.post("webhooks/endpoints", { json: body, headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks", "endpoints"] });
      toast.success("Webhook endpoint created successfully.");
    },
    onError: apiErrorHandler,
  });
}
