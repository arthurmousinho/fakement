import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { Card } from "./ui/card";
import {
  CardholderIcon,
  GithubLogoIcon,
  KeyIcon,
  WebhooksLogoIcon,
  CurrencyCircleDollarIcon,
  ReceiptIcon,
  BookOpenIcon,
  GaugeIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { label: "Dashboard", href: "/", icon: GaugeIcon },
  { label: "Payments", href: "/payments", icon: CurrencyCircleDollarIcon },
  { label: "Events", href: "/events", icon: ReceiptIcon },
  { label: "Webhooks", href: "/webhooks", icon: WebhooksLogoIcon },
  { label: "API Keys", href: "/api-keys", icon: KeyIcon },
  { label: "Docs", href: "/docs", icon: BookOpenIcon },
] as const;

export function Header() {
  return (
    <Card className="flex flex-row items-center justify-between w-full py-0 px-6 py-4 bg-slate-100 rounded">
      <div className="flex items-center gap-2 text-lg font-medium text-primary">
        <CardholderIcon size={32} />
        <h1>Fakement</h1>
      </div>
      <nav className="space-x-4">
        {navigationLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link
              to={link.href}
              key={index}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
        <Button variant="outline">
          <GithubLogoIcon size={32} />
          Star on GitHub
        </Button>
      </nav>
    </Card>
  );
}
