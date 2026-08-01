import type { ReactNode } from "react";

type DetailRowProps = {
  label: string;
  children: ReactNode;
};

export function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-foreground">{label}</span>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
