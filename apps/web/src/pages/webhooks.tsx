import { PaymentEventType } from "@/components/payment-event-type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WebhookEndpointFormDialog } from "@/components/webhook-endpoint-form-dialog";
import { FindAllWebhookEndpointsRequest } from "@/http/webhooks-http";
import { formatDateTime } from "@/lib/formatters";
import {
  PencilIcon,
  ProhibitIcon,
  DotsThreeIcon,
  WebhooksLogoIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";

export function WebhooksPage() {
  const { data, isPending, isError, refetch } =
    FindAllWebhookEndpointsRequest();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <p className="text-sm text-muted-foreground">
          Failed to load Webhooks.
        </p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <WebhooksLogoIcon size={24} className="font-medium" />
            <h1 className="text-xl font-medium tracking-tight">WebHooks</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Webhooks allow payment gateways to send notifications to your
            application whenever an event occurs, such as successful or failed
            payments, refunds, chargebacks, or transaction status updates.
          </p>
        </div>

        <WebhookEndpointFormDialog>
          <Button>
            <PlusIcon size={18} />
            New Webhook
          </Button>
        </WebhookEndpointFormDialog>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead className="text-right">URL</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right">Updated At</TableHead>
            <TableHead className="text-right">Events</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="text-right">{item.url}</TableCell>
              <TableCell className="text-right">
                {formatDateTime(item.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                {formatDateTime(item.updatedAt)}
              </TableCell>
              <TableCell className="text-right">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Badge variant="outline" className="cursor-pointer">
                      {item.events?.length ?? 0} event
                      {(item.events?.length ?? 0) !== 1 ? "s" : ""}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64" side="left">
                    {item.events && item.events.length > 0 ? (
                      <ul className="flex flex-col gap-1">
                        {item.events.map((event) => (
                          <PaymentEventType key={event} type={event} />
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No events configured.
                      </p>
                    )}
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant={item.enabled ? "default" : "destructive"}>
                  {item.enabled ? "Active" : "Disabled"}
                </Badge>
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
                      <PencilIcon size={32} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ProhibitIcon size={32} />
                      Revoke
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <TrashIcon size={32} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {data?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-muted-foreground"
              >
                No Webhooks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
