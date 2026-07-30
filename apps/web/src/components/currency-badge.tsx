import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Currency = "BRL" | "USD" | "EUR";

type CurrencyBadgeProps = {
  currency: Currency;
  className?: string;
};

const CURRENCY_CONFIG: Record<
  Currency,
  { emoji: string; label: string; className: string }
> = {
  BRL: {
    emoji: "🇧🇷",
    label: "BRL",
    className:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900",
  },
  USD: {
    emoji: "🇺🇸",
    label: "USD",
    className:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
  },
  EUR: {
    emoji: "🇪🇺",
    label: "EUR",
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-900",
  },
};

export function CurrencyBadge({ currency, className }: CurrencyBadgeProps) {
  const {
    emoji,
    label,
    className: currencyClassName,
  } = CURRENCY_CONFIG[currency];

  return (
    <Badge
      variant="outline"
      className={cn("gap-1 font-mono", currencyClassName, className)}
    >
      <span>{emoji}</span>
      {label}
    </Badge>
  );
}
