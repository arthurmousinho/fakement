import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { PaymentCurrencyBadge } from "@/components/payment-currency-badge";
import { PaymentMethodBadge } from "@/components/payment-method-badge";
import { PaymentStatusBadge } from "@/components/payment-status-badge";
import { formatCurrencyFromCents } from "@/lib/formatters";
import { formatDateTime } from "@/lib/formatters";
import type { Payment } from "@/http/payments-http";
import { CopyableField } from "./ui/copyable-field";
import { DetailRow } from "./ui/detail-row";

type PaymentDetailsDialogProps = {
  payment: Payment;
  children: ReactNode;
};

export function PaymentDetailsDialog({
  payment,
  children,
}: PaymentDetailsDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment details</DialogTitle>
          <DialogDescription>
            Full information about this payment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold tracking-tight">
              {formatCurrencyFromCents(payment.amountInCents, payment.currency)}
            </span>
            <PaymentStatusBadge status={payment.status} />
          </div>

          <Separator />

          <div className="space-y-2.5">
            <DetailRow label="Currency">
              <PaymentCurrencyBadge currency={payment.currency} />
            </DetailRow>
            <DetailRow label="Method">
              <PaymentMethodBadge method={payment.method} />
            </DetailRow>
            <DetailRow label="Description">
              {payment.description ?? (
                <span className="text-muted-foreground">—</span>
              )}
            </DetailRow>
          </div>

          <Separator />

          <div className="space-y-2.5">
            <CopyableField label="Payment ID" value={payment.id} />
            <CopyableField label="API Key ID" value={payment.apiKeyId} />
            {payment.externalId && (
              <CopyableField label="External ID" value={payment.externalId} />
            )}
            {payment.idempotencyKey && (
              <CopyableField
                label="Idempotency Key"
                value={payment.idempotencyKey}
              />
            )}
          </div>

          <Separator />

          <div className="space-y-2.5">
            <DetailRow label="Created at">
              {formatDateTime(payment.createdAt)}
            </DetailRow>
            <DetailRow label="Updated at">
              {formatDateTime(payment.updatedAt)}
            </DetailRow>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
