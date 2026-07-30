import { api } from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export type PaymentCurrency = "BRL" | "USD" | "EUR";
export type PaymentMethod = "CARD" | "PIX" | "BANK_SLIP";
export type PaymentStatus =
  "CREATED" | "PROCESSING" | "APPROVED" | "DECLINED" | "CANCELED";

export type Payment = {
  id: string;
  amountInCents: number;
  currency: PaymentCurrency;
  method: PaymentMethod;
  status: PaymentStatus;
  description: string | null;
  externalId: string | null;
  idempotencyKey: string | null;
  apiKeyId: string;
  createdAt: string;
  updatedAt: string;
};

export function FindAllPaymentsRequest() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const request = await api.get("payments");
      return await request.json<Payment[]>();
    },
  });
}
