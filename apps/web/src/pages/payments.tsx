import { CurrencyBadge } from "@/components/currency-badge";
import { PaymentMethodBadge } from "@/components/payment-method-badge";
import { PaymentStatusBadge } from "@/components/payment-status-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrencyFromCents, formatDateTime } from "@/lib/formatters";
import {
  CheckIcon,
  ArrowClockwiseIcon,
  ProhibitIcon,
  DotsThreeIcon,
  CurrencyCircleDollarIcon,
  XIcon,
  EyeIcon,
} from "@phosphor-icons/react";

export function PaymentsPage() {
  const data = [
    {
      id: "358e46a1-0307-49cf-9578-84403537db5a",
      amountInCents: 20000,
      currency: "BRL",
      method: "PIX",
      status: "APPROVED",
      description: null,
      externalId: null,
      idempotencyKey: null,
      apiKeyId: "b974efc1-f241-48d9-bef4-093046ae5830",
      createdAt: "2026-07-28T13:44:25.452Z",
      updatedAt: "2026-07-28T13:44:43.862Z",
    },
  ];

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CurrencyCircleDollarIcon size={24} className="font-medium" />
            <h1 className="text-xl font-medium tracking-tight">Payments</h1>
          </div>

          <p className="text-sm text-muted-foreground">
            The Payments section allows you to create, monitor, and manage
            payment transactions processed through your gateway. Track payment
            statuses, review transaction details, handle refunds, and
            troubleshoot payment flows from a single place.
          </p>
        </div>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Currency</TableHead>
            <TableHead className="text-right">Method</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="text-right">
                {formatCurrencyFromCents(item.amountInCents, "BRL")}
              </TableCell>
              <TableCell className="text-right">
                <CurrencyBadge currency={"BRL"} />
              </TableCell>
              <TableCell className="text-right">
                <PaymentMethodBadge method="PIX" />
              </TableCell>
              <TableCell className="text-right">
                <PaymentStatusBadge status="APPROVED" />
              </TableCell>
              <TableCell className="text-right">
                {formatDateTime(item.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <DotsThreeIcon size={32} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right">
                    <DropdownMenuItem>
                      <EyeIcon size={32} />
                      Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowClockwiseIcon size={32} />
                      Process
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckIcon size={32} />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ProhibitIcon size={32} />
                      Decline
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <XIcon size={32} />
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {data?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-10 text-center text-muted-foreground"
              >
                No Payments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
