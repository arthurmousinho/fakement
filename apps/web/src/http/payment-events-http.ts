import { api } from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import type { Payment } from "./payments-http";

export type PaymentEventType =
  | "PAYMENT_CREATED"
  | "PAYMENT_PROCESSING"
  | "PAYMENT_APPROVED"
  | "PAYMENT_DECLINED"
  | "PAYMENT_CANCELED";

export type PaymentEvent = {
  id: string;
  paymentId: string;
  type: PaymentEventType;
  createdAt: string;
  payload: Payment;
};

export function FindAllPaymentEventsRequest(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const request = await api.get("events");
      return await request.json<PaymentEvent[]>();
    },
    enabled: options?.enabled,
  });
}
