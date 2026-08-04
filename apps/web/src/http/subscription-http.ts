import { api, apiErrorHandler } from "@/lib/ky";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";
import type { PaymentCurrency, PaymentMethod } from "./payments-http";

export type SubscriptionInterval = "DAY" | "WEEK" | "MONTH" | "YEAR";
export type SubscriptionStatus = "ACTIVE" | "CANCELED" | "PAUSED";

export type Subscription = {
  id: string;
  description: string;
  amountInCents: number;
  currency: PaymentCurrency;
  method: PaymentMethod;
  interval: SubscriptionInterval;
  intervalCount: number;
  status: SubscriptionStatus;
  nextBillingAt: string;
  createdAt: string;
  updatedAt: string;
  apiKeyId: string;
};

export function FindAllSubscriptionsRequest() {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const request = await api.get("subscriptions");
      return await request.json<Subscription[]>();
    },
  });
}

export function ResumeSubscriptionRequest() {
  return useMutation({
    mutationFn: async (id: string) => {
      const request = await api.patch(`subscriptions/${id}/resume`);
      return await request.json<Subscription>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Subscription resumed successfully.");
    },
    onError: apiErrorHandler,
  });
}

export function CancelSubscriptionRequest() {
  return useMutation({
    mutationFn: async (id: string) => {
      const request = await api.patch(`subscriptions/${id}/cancel`);
      return await request.json<Subscription>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Subscription canceled successfully.");
    },
    onError: apiErrorHandler,
  });
}

export function PauseSubscriptionRequest() {
  return useMutation({
    mutationFn: async (id: string) => {
      const request = await api.patch(`subscriptions/${id}/pause`);
      return await request.json<Subscription>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Subscription paused successfully.");
    },
    onError: apiErrorHandler,
  });
}
