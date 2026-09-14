import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-muted hover:text-foreground relative text-sm font-medium tracking-wide transition-colors duration-200",
        "after:bg-accent after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 hover:after:scale-x-100",
        "motion-safe:after:transition-transform motion-safe:after:duration-200",
        className,
      )}
    >
      {children}
    </Link>
  );
}
