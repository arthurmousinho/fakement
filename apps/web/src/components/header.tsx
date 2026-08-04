import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { Card } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  GithubLogoIcon,
  KeyIcon,
  WebhooksLogoIcon,
  CurrencyCircleDollarIcon,
  BookOpenIcon,
  GaugeIcon,
  SunIcon,
  MoonIcon,
  DesktopIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";
import { Logo } from "./logo";

const navigationLinks = [
  { label: "Dashboard", href: "/", icon: GaugeIcon },
  { label: "Payments", href: "/payments", icon: CurrencyCircleDollarIcon },
  { label: "Webhooks", href: "/webhooks", icon: WebhooksLogoIcon },
  { label: "API Keys", href: "/api-keys", icon: KeyIcon },
  { label: "API Doc", href: "/api-doc", icon: BookOpenIcon },
] as const;

export function Header() {
  const { setTheme } = useTheme();

  return (
    <Card className="flex flex-row items-center justify-between w-full px-6 py-4 bg-slate-100 dark:bg-muted rounded">
      <Logo />
      <nav className="flex items-center space-x-2">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon
                size={18}
                className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
              />
              <MoonIcon
                size={18}
                className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
              />
              <span className="sr-only">Alternar tema</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <SunIcon size={16} />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <MoonIcon size={16} />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <DesktopIcon size={16} />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" asChild>
          <a
            href="https://github.com/arthurmousinho/fakement"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogoIcon size={32} />
            Star on GitHub
          </a>
        </Button>
      </nav>
    </Card>
  );
}
