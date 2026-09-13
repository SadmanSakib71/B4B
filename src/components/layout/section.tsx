import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
};

export function Section({
  children,
  className,
  as: Tag = "section",
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
      {children}
    </Tag>
  );
}
