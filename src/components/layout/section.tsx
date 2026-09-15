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
  "aria-labelledby"?: string;
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
  "aria-labelledby": ariaLabelledBy,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
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
