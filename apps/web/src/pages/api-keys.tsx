import { Button } from "@/components/ui/button";
import {
  ArrowClockwiseIcon,
  DotsThreeIcon,
  KeyIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/formatters";

export function ApiKeysPage() {
  const data = [
    {
      id: "076815a9-ca14-4642-98a6-a5a67623b54a",
      name: "my-first-key",
      revokedAt: null,
      createdAt: "2026-07-27T20:43:26.693Z",
      updatedAt: "2026-07-27T20:43:26.693Z",
    },
    {
      id: "b974efc1-f241-48d9-bef4-093046ae5830",
      name: "my-second-key",
      revokedAt: "2026-07-27T20:43:04.276Z",
      createdAt: "2026-07-27T20:43:04.276Z",
      updatedAt: "2026-07-27T20:43:04.276Z",
    },
  ];

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <KeyIcon size={24} className="font-medium" />
            <h1 className="text-xl font-medium tracking-tight">API Keys</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            API keys are used to authenticate your application when interacting
            with the payment gateways. They allow you to securely create
            payments, query transactions, trigger webhooks, and test payment
            flows just like you would with a real payment provider.
          </p>
        </div>
        <Button>
          <PlusIcon size={18} />
          New API Key
        </Button>
      </header>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Created At</TableHead>
              <TableHead className="text-right">Updated At</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">
                  {formatDateTime(item.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  {formatDateTime(item.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={item.revokedAt ? "destructive" : "default"}>
                    {item.revokedAt ? "Revoked" : "Active"}
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
                        <ArrowClockwiseIcon size={32} />
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
