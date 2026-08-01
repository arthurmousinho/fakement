import { Badge } from "./ui/badge";

export function StatusCodeBadge({ statusCode }: { statusCode: number | null }) {
  if (statusCode === null) {
    return <Badge variant="secondary">—</Badge>;
  }
  const isSuccess = statusCode >= 200 && statusCode < 300;
  return (
    <Badge variant={isSuccess ? "default" : "destructive"}>{statusCode}</Badge>
  );
}
