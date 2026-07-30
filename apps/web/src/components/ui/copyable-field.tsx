import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "./button";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

type CopyableFieldProps = {
  label: string;
  value: string;
};

export function CopyableField({ label, value }: CopyableFieldProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-sm">{value}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-6"
          onClick={() => copy(value)}
        >
          {copied ? (
            <CheckIcon size={14} className="text-green-600" />
          ) : (
            <CopyIcon size={14} />
          )}
        </Button>
      </div>
    </div>
  );
}
