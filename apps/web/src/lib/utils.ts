import type { PaymentStatus } from "@/http/payments-http";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function canChangePaymentStatus(
  currentStatus: PaymentStatus,
  newStatus: PaymentStatus,
) {
  const validTransitions: Record<PaymentStatus, PaymentStatus[]> = {
    CREATED: ["PROCESSING", "CANCELED"],
    PROCESSING: ["APPROVED", "DECLINED"],
    APPROVED: ["CANCELED"],
    DECLINED: [],
    CANCELED: [],
  };
  const allowed = validTransitions[currentStatus];
  return allowed.includes(newStatus);
}
