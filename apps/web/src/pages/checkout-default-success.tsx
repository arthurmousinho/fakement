import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { CheckCircleIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export function CheckoutDefaultSuccessPage() {
  return (
    <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-muted/30 px-4">
      <Logo />
      <Card className="w-full max-w-md overflow-hidden">
        <CardContent className="flex flex-col items-center gap-6 p-10 text-center">
          <div className="flex size-16 items-center justify-center  bg-emerald-100 dark:bg-emerald-950">
            <CheckCircleIcon
              size={40}
              weight="fill"
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold tracking-tight">
              Payment approved
            </h1>
            <p className="text-sm text-muted-foreground">
              Your payment was processed successfully. You can safely close this
              page now
            </p>
          </div>

          <Link
            to="/"
            className={cn(
              buttonVariants({
                size: "lg",
                className: "w-full gap-2",
              }),
            )}
          >
            <ArrowLeftIcon size={16} />
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
