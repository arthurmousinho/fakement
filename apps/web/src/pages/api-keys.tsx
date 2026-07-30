import { ApiKeyFormDialog } from "@/components/api-key-form-dialog";
import { Badge } from "@/components/ui/badge";
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
import { formatDateTime } from "@/lib/formatters";
import {
  DeleteApiKeyRequest,
  FindAllApiKeysRequest,
  RevokeApiKeyRequest,
} from "@/http/api-keys-http";
import {
  ProhibitIcon,
  DotsThreeIcon,
  KeyIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";

export function ApiKeysPage() {
  const { data, isPending, isError, refetch } = FindAllApiKeysRequest();
  const { mutate: deleteRequest, isPending: isDeleting } =
    DeleteApiKeyRequest();
  const { mutate: revokeRequest, isPending: isRevoking } =
    RevokeApiKeyRequest();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <p className="text-sm text-muted-foreground">
          Failed to load API keys.
        </p>

        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );
  }

  function handleDelete(id: string) {
    if (isDeleting) return;
    deleteRequest(id);
  }

  function handleRevoke(id: string) {
    if (isRevoking) return;
    revokeRequest(id);
  }

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

        <ApiKeyFormDialog>
          <Button>
            <PlusIcon size={18} />
            New API Key
          </Button>
        </ApiKeyFormDialog>
      </header>

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
          {data?.map((item) => (
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
                    <DropdownMenuItem
                      onClick={() => handleRevoke(item.id)}
                      disabled={Boolean(item.revokedAt) || isRevoking}
                    >
                      <ProhibitIcon size={32} />
                      Revoke
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting}
                    >
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
                colSpan={5}
                className="py-10 text-center text-muted-foreground"
              >
                No API keys found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
