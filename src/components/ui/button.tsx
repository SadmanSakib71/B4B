import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const buttonVariants = {
  primary: "bg-accent text-background hover:bg-accent/90",
  secondary:
    "border-border bg-card text-foreground hover:border-foreground/20 hover:bg-secondary border",
  ghost: "text-muted hover:text-foreground",
} as const;

type ButtonVariant = keyof typeof buttonVariants;

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLinkButton(props: ButtonProps): props is ButtonAsLink {
  return typeof (props as ButtonAsLink).href === "string";
}

function buttonClassName(variant: ButtonVariant, className?: string) {
  return cn(
    "inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-medium whitespace-nowrap",
    "transition-colors duration-200",
    "disabled:cursor-not-allowed disabled:opacity-40",
    buttonVariants[variant],
    className,
  );
}

export function Button(props: ButtonProps) {
  if (isLinkButton(props)) {
    const {
      href,
      children,
      variant = "primary",
      className,
      ...linkProps
    } = props;

    return (
      <Link
        {...linkProps}
        href={href}
        className={buttonClassName(variant, className)}
      >
        {children}
      </Link>
    );
  }

  const {
    children,
    variant = "primary",
    className,
    type,
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type ?? "button"}
      className={buttonClassName(variant, className)}
    >
      {children}
    </button>
  );
}
