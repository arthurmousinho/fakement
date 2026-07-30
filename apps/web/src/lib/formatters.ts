import type { Currency } from "@/components/payment-currency-badge";

export function formatDateTime(date: Date | string | number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

const CURRENCY_LOCALE_MAP: Record<Currency, string> = {
  BRL: "pt-BR",
  USD: "en-US",
  EUR: "de-DE",
};

export function formatCurrencyFromCents(
  amountInCents: number,
  currency: Currency,
): string {
  const amount = amountInCents / 100;

  return new Intl.NumberFormat(CURRENCY_LOCALE_MAP[currency], {
    style: "currency",
    currency,
  }).format(amount);
}
