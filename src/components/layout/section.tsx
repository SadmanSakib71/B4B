import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTag = "section" | "div" | "header" | "footer" | "main";

type SectionBackground = "default" | "secondary";

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: SectionTag;
  id?: string;
  background?: SectionBackground;
};

const backgroundClasses: Record<SectionBackground, string> = {
  default: "bg-background",
  secondary: "bg-secondary",
};

export function Section({
  children,
  className,
  as: Tag = "section",
  id,
  background,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        background && backgroundClasses[background],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
