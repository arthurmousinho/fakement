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

export type CreateWebhookEndpointResponseData = {
  id: string;
  url: string;
  secret: string;
  enabled: boolean;
  events: PaymentEventType[];
  apiKeyId: string;
  createdAt: string;
  updatedAt: string;
};

export function CreateWebhookEndpointRequest() {
  return useMutation({
    mutationFn: async (data: CreateWebhookEndpointRequestData) => {
      const headers = { Authorization: `Bearer ${data.apiKey}` };
      const body = { url: data.url, events: data.events };
      const request = await api.post("webhooks/endpoints", {
        json: body,
        headers,
      });
      return await request.json<CreateWebhookEndpointResponseData>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks", "endpoints"] });
      toast.success("Webhook endpoint created successfully.");
    },
    onError: apiErrorHandler,
  });
}

export type RotateWebhookEndpointResponseData = {
  secret: string;
};

export function RotateWebhookEndpointRequest() {
  return useMutation({
    mutationFn: async (id: string) => {
      const request = await api.patch(`webhooks/endpoints/${id}/secret/rotate`);
      return await request.json<RotateWebhookEndpointResponseData>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks", "endpoints"] });
      toast.success("Webhook endpoint secret rotated successfully.");
    },
    onError: apiErrorHandler,
  });
}

export function DeleteWebhookEndpointRequest() {
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`webhooks/endpoints/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks", "endpoints"] });
      toast.success("Webhook endpoint deleted successfully.");
    },
    onError: apiErrorHandler,
  });
}

export type eUpdateWebhookEndpointRequestData = {
  id: string;
  url: string;
  events: string[];
};

export function UpdateWebhookEndpointRequest() {
  return useMutation({
    mutationFn: async (data: eUpdateWebhookEndpointRequestData) => {
      const body = { url: data.url, events: data.events };
      await api.patch(`webhooks/endpoints/${data.id}`, { json: body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks", "endpoints"] });
      toast.success("Webhook endpoint updated successfully.");
    },
    onError: apiErrorHandler,
  });
}
