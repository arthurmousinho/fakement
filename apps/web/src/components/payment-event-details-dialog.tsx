import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentEventType } from "@/components/payment-event-type";
import { formatDateTime } from "@/lib/formatters";
import type { PaymentEvent } from "@/http/payment-events-http";
import { CopyableField } from "./ui/copyable-field";
import { DetailRow } from "./ui/detail-row";

type PaymentEventDetailsDialogProps = {
  event: PaymentEvent;
  children: ReactNode;
};

export function PaymentEventDetailsDialog({
  event,
  children,
}: PaymentEventDetailsDialogProps) {
  const [open, setOpen] = useState(false);

  const prettyPayload = JSON.stringify(event.payload, null, 2);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Event details</DialogTitle>
          <DialogDescription>
            Information about this event and its raw payload.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <DetailRow label="Type">
            <PaymentEventType type={event.type} />
          </DetailRow>
          <div className="space-y-2.5">
            <CopyableField label="Event ID" value={event.id} />
            <CopyableField label="Payment ID" value={event.paymentId} />
          </div>
          <DetailRow label="Created At">
            {formatDateTime(event.createdAt)}
          </DetailRow>
          <div className="space-y-1.5">
            <span className="text-sm text-muted-foreground">Payload</span>
            <pre className="max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">
              {prettyPayload}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
