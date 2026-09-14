import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  headingAs?: "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  className,
  headingAs: HeadingTag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-muted text-xs font-medium tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {heading}
      </HeadingTag>
      {description ? (
        <p className="text-muted text-base leading-relaxed text-pretty sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
