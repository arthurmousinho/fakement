/* eslint-disable */
import { Badge } from "@/components/ui/badge";
import type { SubscriptionInterval } from "@/http/subscription-http";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  CalendarBlankIcon,
  CalendarDotsIcon,
  CalendarStarIcon,
} from "@phosphor-icons/react";

type SubscriptionIntervalBadgeProps = {
  interval: SubscriptionInterval;
  className?: string;
};

export const SUBSCRIPTION_INTERVAL_CONFIG: Record<
  SubscriptionInterval,
  { label: string; icon: React.ElementType; className: string }
> = {
  DAY: {
    label: "Daily",
    icon: CalendarIcon,
    className:
      "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-900",
  },
  WEEK: {
    label: "Weekly",
    icon: CalendarBlankIcon,
    className:
      "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-900",
  },
  MONTH: {
    label: "Monthly",
    icon: CalendarDotsIcon,
    className:
      "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-900",
  },
  YEAR: {
    label: "Yearly",
    icon: CalendarStarIcon,
    className:
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
  },
} as const;

export function SubscriptionIntervalBadge({
  interval,
  className,
}: SubscriptionIntervalBadgeProps) {
  const {
    label,
    icon: Icon,
    className: intervalClassName,
  } = SUBSCRIPTION_INTERVAL_CONFIG[interval];

  return (
    <Badge
      variant="outline"
      className={cn("gap-1", intervalClassName, className)}
    >
      <Icon size={14} weight="bold" />
      {label}
    </Badge>
  );
}
