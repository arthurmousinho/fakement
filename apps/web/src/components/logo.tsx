import { CardholderIcon } from "@phosphor-icons/react";

type LogoProps = {
  href?: string;
  target?: string;
};

export function Logo({ href = "/", target = "_self" }: LogoProps) {
  return (
    <a
      href={href}
      target={target}
      className="flex items-center gap-2 text-lg font-medium text-primary cursor-pointer"
    >
      <CardholderIcon size={32} />
      <h1>Mockment</h1>
    </a>
  );
}
