import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, type ReactNode } from "react";
import { CreateApiKeyRequest } from "@/http/api-keys-http";
import { RevealedApiKeyDialog } from "@/components/revealed-api-key-dialog";

const apiKeySchema = z.object({
  name: z
    .string({ message: "O nome deve ser um texto" })
    .trim()
    .min(3, "O nome deve possuir pelo menos 3 caracteres.")
    .max(100, "O nome deve possuir no máximo 100 caracteres."),
});

type ApiKeyFormData = z.infer<typeof apiKeySchema>;

type ApiKeyFormDialogProps = {
  children: ReactNode;
};

export function ApiKeyFormDialog({ children }: ApiKeyFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [rawKey, setRawKey] = useState<string | null>(null);

  const { mutate: createRequest, isPending: isCreating } =
    CreateApiKeyRequest();

  const form = useForm<ApiKeyFormData>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: { name: "" },
  });

  function onSubmit(data: ApiKeyFormData) {
    if (isCreating) return;
    createRequest(data, {
      onSuccess: (response) => {
        setRawKey(response.rawKey);
      },
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        form.reset();
        setRawKey(null);
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        {rawKey ? (
          <RevealedApiKeyDialog
            title="API key criada"
            description="Copie sua chave agora. Por segurança, ela não será exibida novamente."
            value={rawKey}
            onDone={() => handleOpenChange(false)}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>New API Key</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new API key.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My first API key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isCreating}>
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
