import { Badge } from "@/components/ui/badge";
import type { PaymentMethod } from "@/http/payments-http";
import { cn } from "@/lib/utils";
import { CreditCardIcon, QrCodeIcon, BarcodeIcon } from "@phosphor-icons/react";

type PaymentMethodBadgeProps = {
  method: PaymentMethod;
  className?: string;
};

const PAYMENT_METHOD_CONFIG: Record<
  PaymentMethod,
  { label: string; icon: React.ElementType; className: string }
> = {
  CARD: {
    label: "Card",
    icon: CreditCardIcon,
    className:
      "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-900",
  },
  PIX: {
    label: "Pix",
    icon: QrCodeIcon,
    className:
      "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-900",
  },
  BANK_SLIP: {
    label: "Bank Slip",
    icon: BarcodeIcon,
    className:
      "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-900",
  },
};

export function PaymentMethodBadge({
  method,
  className,
}: PaymentMethodBadgeProps) {
  const {
    label,
    icon: Icon,
    className: methodClassName,
  } = PAYMENT_METHOD_CONFIG[method];

  return (
    <Badge
      variant="outline"
      className={cn("gap-1", methodClassName, className)}
    >
      <Icon size={14} weight="bold" />
      {label}
    </Badge>
  );
}
