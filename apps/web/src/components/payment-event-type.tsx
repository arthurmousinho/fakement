import { cn } from "@/lib/utils";
import { type PaymentEventType } from "@/http/payment-events-http";

type PaymentEventTypeProps = {
  type: PaymentEventType;
  className?: string;
};

const PAYMENT_EVENT_TYPE_CONFIG: Record<
  PaymentEventType,
  { className: string }
> = {
  PAYMENT_CREATED: {
    className: "text-slate-800 dark:text-slate-300",
  },
  PAYMENT_PROCESSING: {
    className: "text-blue-800 dark:text-blue-300",
  },
  PAYMENT_APPROVED: {
    className: "text-green-800 dark:text-green-300 ",
  },
  PAYMENT_DECLINED: {
    className: "text-red-800  dark:text-red-300 ",
  },
  PAYMENT_CANCELED: {
    className: "text-zinc-600  dark:text-zinc-400",
  },
};

export function PaymentEventType({ type, className }: PaymentEventTypeProps) {
  const { className: typeClassName } = PAYMENT_EVENT_TYPE_CONFIG[type];

  return (
    <span className={cn("font-medium", typeClassName, className)}>{type}</span>
  );
}
