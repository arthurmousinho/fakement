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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, type ReactNode } from "react";
import { CreateWebhookEndpointRequest } from "@/http/webhooks-http";
import { RevealedSecretDialog } from "@/components/revealed-secret-dialog";

const PAYMENT_EVENT_TYPES = [
  { value: "PAYMENT_CREATED", label: "Payment created" },
  { value: "PAYMENT_PROCESSING", label: "Payment processing" },
  { value: "PAYMENT_APPROVED", label: "Payment approved" },
  { value: "PAYMENT_DECLINED", label: "Payment declined" },
  { value: "PAYMENT_CANCELED", label: "Payment canceled" },
] as const;

const webhookEndpointSchema = z.object({
  url: z
    .string({ message: "A URL deve ser um texto" })
    .trim()
    .url("Informe uma URL válida."),
  events: z
    .array(
      z.enum([
        "PAYMENT_CREATED",
        "PAYMENT_PROCESSING",
        "PAYMENT_APPROVED",
        "PAYMENT_DECLINED",
        "PAYMENT_CANCELED",
      ]),
    )
    .min(1, "Selecione ao menos um evento."),
  apiKey: z
    .string({ message: "A API key deve ser um texto" })
    .trim()
    .min(1, "Informe a API key."),
});

type WebhookEndpointFormData = z.infer<typeof webhookEndpointSchema>;

type WebhookEndpointFormDialogProps = {
  children: ReactNode;
};

export function WebhookEndpointFormDialog({
  children,
}: WebhookEndpointFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);

  const { mutate: createRequest, isPending: isCreating } =
    CreateWebhookEndpointRequest();

  const form = useForm<WebhookEndpointFormData>({
    resolver: zodResolver(webhookEndpointSchema),
    defaultValues: { url: "", events: [], apiKey: "" },
  });

  function onSubmit(data: WebhookEndpointFormData) {
    if (isCreating) return;
    createRequest(data, {
      onSuccess: (response) => {
        setSecret(response.secret);
      },
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        form.reset();
        setSecret(null);
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        {secret ? (
          <RevealedSecretDialog
            title="Webhook criado"
            description="Copie o secret agora. Por segurança, ele não será exibido novamente."
            value={secret}
            onDone={() => handleOpenChange(false)}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>New Webhook</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new webhook endpoint.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/webhooks"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="sk_live_..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="events"
                  render={() => (
                    <FormItem>
                      <FormLabel>Events</FormLabel>
                      <FormDescription>
                        Select which events should trigger this webhook.
                      </FormDescription>
                      <div className="space-y-2">
                        {PAYMENT_EVENT_TYPES.map((event) => (
                          <FormField
                            key={event.value}
                            control={form.control}
                            name="events"
                            render={({ field }) => {
                              const checked = field.value?.includes(
                                event.value,
                              );
                              return (
                                <FormItem className="flex flex-row items-center gap-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={checked}
                                      onCheckedChange={(isChecked) => {
                                        if (isChecked) {
                                          field.onChange([
                                            ...field.value,
                                            event.value,
                                          ]);
                                        } else {
                                          field.onChange(
                                            field.value.filter(
                                              (value) => value !== event.value,
                                            ),
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {event.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
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
