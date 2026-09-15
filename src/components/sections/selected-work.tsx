import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { selectedWork } from "@/data/site";
import { cn } from "@/lib/utils";
import type { ShowcaseProject } from "@/types/site";

const EYEBROW = "Selected Work";
const HEADING = "Products Built To Move Ideas Forward.";
const DESCRIPTION =
  "A selection of digital products, platforms, and technical solutions that reflect how we approach real-world product development.";
const SHOWCASE_LABEL = "Product Showcase";

const PROJECT_GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
} as const;

const cardClassName =
  "border-border bg-card hover:border-foreground/20 group relative overflow-hidden rounded-lg border transition-[border-color,background-color] duration-200 hover:bg-[#1a1a1a] motion-reduce:transition-none";

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

function ProjectIndex({ value }: { value: string }) {
  return (
    <span className="text-muted relative inline-block text-[0.6875rem] font-medium tracking-[0.18em]">
      {value}
      <span
        aria-hidden="true"
        className="bg-accent/0 group-hover:bg-accent/50 absolute top-full left-0 mt-1 h-px w-3.5 transition-colors duration-200 motion-reduce:transition-none"
      />
    </span>
  );
}

function ProjectArrow({ className }: { className?: string }) {
  return (
    <ArrowUpRight
      aria-hidden="true"
      size={16}
      strokeWidth={1.75}
      className={cn(
        "text-muted group-hover:text-foreground shrink-0 transition-[color,transform] duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none",
        className,
      )}
    />
  );
}

function ProjectTags({ technologies }: { technologies: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 sm:mt-6">
      {technologies.map((technology) => (
        <li
          key={technology}
          className="text-muted text-[0.625rem] font-medium tracking-[0.16em] uppercase"
        >
          {technology}
        </li>
      ))}
    </ul>
  );
}

function VisualFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          ...PROJECT_GRID_STYLE,
          maskImage:
            "radial-gradient(ellipse 80% 75% at 50% 42%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 75% at 50% 42%, black, transparent)",
        }}
      />

      <div className="relative h-full p-3 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1 sm:p-4">
        {children}
      </div>
    </div>
  );
}

function VisualChrome({ children }: { children: ReactNode }) {
  return (
    <div className="border-border/80 bg-secondary/50 relative h-full overflow-hidden rounded-md border">
      <span className="border-foreground/20 absolute top-0 left-0 h-2 w-2 border-t border-l" />
      <span className="border-foreground/20 absolute top-0 right-0 h-2 w-2 border-t border-r" />
      <span className="border-foreground/20 absolute bottom-0 left-0 h-2 w-2 border-b border-l" />
      <span className="border-foreground/20 absolute right-0 bottom-0 h-2 w-2 border-r border-b" />
      {children}
    </div>
  );
}

function UappVisual() {
  return (
    <VisualChrome>
      <div className="flex h-full min-h-[16rem] sm:min-h-[18.5rem] lg:min-h-[24.5rem]">
        <div className="border-border/80 bg-card/40 flex w-10 shrink-0 flex-col gap-2.5 border-r px-2 py-3 sm:w-12 sm:px-2.5 sm:py-4">
          <span className="border-accent/25 bg-accent/10 size-4 rounded-sm border sm:size-5" />
          <span className="bg-foreground/12 mt-1 h-px w-full" />
          {[0, 1, 2, 3, 4].map((slot) => (
            <span
              key={slot}
              className={
                slot === 1
                  ? "bg-foreground/20 h-1.5 w-full rounded-[1px]"
                  : "bg-foreground/10 h-1.5 w-full rounded-[1px]"
              }
            />
          ))}
          <span className="bg-foreground/10 mt-auto h-1.5 w-3/4 rounded-[1px]" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-2.5 sm:gap-3 sm:p-3.5">
          <div className="border-border/80 bg-card/40 flex h-7 items-center gap-2 rounded-sm border px-2 sm:h-8">
            <span className="bg-foreground/12 h-1.5 w-16 rounded-[1px] sm:w-24" />
            <span className="bg-foreground/8 ml-auto h-1.5 w-8 rounded-[1px]" />
            <span className="border-border size-3 rounded-full border" />
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              { bar: 62, accent: false },
              { bar: 84, accent: true },
              { bar: 48, accent: false },
            ].map((stat) => (
              <div
                key={stat.bar}
                className={cn(
                  "rounded-sm border px-2 py-2 sm:px-2.5 sm:py-2.5",
                  stat.accent
                    ? "border-accent/20 bg-accent/5"
                    : "border-border/80 bg-card/50",
                )}
              >
                <span
                  className={
                    stat.accent
                      ? "bg-accent/45 block h-1 w-[42%] rounded-[1px]"
                      : "bg-foreground/14 block h-1 w-[38%] rounded-[1px]"
                  }
                />
                <span className="bg-foreground/10 mt-2 block h-px w-full" />
                <span
                  className="bg-foreground/8 mt-1.5 block h-px"
                  style={{ width: `${stat.bar}%` }}
                />
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-1.5 sm:gap-2">
            <div className="border-border/80 bg-card/40 flex items-end gap-1 rounded-sm border px-2 py-2 sm:gap-1.5 sm:px-2.5 sm:py-2.5">
              {[34, 58, 44, 76, 52, 68, 40, 62].map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className={
                    index === 3
                      ? "bg-accent/50 w-full rounded-sm"
                      : "bg-foreground/12 w-full rounded-sm"
                  }
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <div className="border-border/80 bg-card/40 flex flex-col justify-center gap-2 rounded-sm border px-2 py-2 sm:gap-2.5 sm:px-2.5">
              {[0, 1, 2, 3].map((row) => (
                <span key={row} className="flex items-center gap-2">
                  <span
                    className={
                      row === 1
                        ? "bg-accent/70 size-1.5 shrink-0 rounded-full motion-safe:animate-pulse"
                        : "border-foreground/25 size-1.5 shrink-0 rounded-full border"
                    }
                  />
                  <span className="bg-foreground/12 h-px min-w-0 flex-1" />
                  <span
                    className={
                      row === 1
                        ? "border-accent/25 bg-accent/10 h-2 w-6 shrink-0 rounded-[1px] border"
                        : "bg-foreground/8 h-2 w-6 shrink-0 rounded-[1px]"
                    }
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </VisualChrome>
  );
}

function ConnectifyVisual() {
  return (
    <VisualChrome>
      <div className="flex h-full min-h-[16rem] flex-col gap-2.5 p-3 sm:min-h-[17.5rem] sm:p-3.5">
        <div className="border-border/80 flex items-center gap-2 border-b pb-2.5">
          <span className="border-border bg-foreground/8 size-6 shrink-0 rounded-full border" />
          <span className="min-w-0 flex-1">
            <span className="bg-foreground/14 block h-px w-20" />
            <span className="bg-foreground/8 mt-1.5 block h-px w-12" />
          </span>
          <span className="bg-foreground/8 h-px w-6" />
        </div>

        <div className="border-border/80 bg-card/40 flex min-h-0 flex-1 flex-col rounded-sm border p-2.5">
          <div className="flex items-center gap-2">
            <span className="border-accent/20 bg-accent/10 size-5 shrink-0 rounded-full border" />
            <span className="min-w-0 flex-1">
              <span className="bg-foreground/16 block h-px w-[46%]" />
              <span className="bg-foreground/8 mt-1.5 block h-px w-[28%]" />
            </span>
          </div>
          <span className="bg-foreground/10 mt-3 block h-px w-full" />
          <span className="bg-foreground/8 mt-1.5 block h-px w-[72%]" />
          <div className="border-border/80 bg-secondary/80 mt-3 min-h-[3.5rem] flex-1 rounded-sm border" />
          <div className="mt-2.5 flex items-center gap-3">
            <span className="bg-accent/35 size-1.5 rounded-full motion-safe:animate-pulse" />
            <span className="bg-foreground/12 h-px w-6" />
            <span className="border-foreground/20 size-1.5 rounded-full border" />
            <span className="bg-foreground/12 h-px w-5" />
            <span className="border-foreground/20 size-1.5 rounded-full border" />
          </div>
        </div>

        <div className="flex items-start gap-2 px-1">
          <span className="border-border mt-0.5 size-4 shrink-0 rounded-full border" />
          <span className="min-w-0 flex-1">
            <span className="bg-foreground/12 block h-px w-[58%]" />
            <span className="bg-foreground/8 mt-1.5 block h-px w-[40%]" />
          </span>
        </div>
      </div>
    </VisualChrome>
  );
}

function SneakerDropVisual() {
  return (
    <VisualChrome>
      <div className="flex h-full min-h-[16rem] flex-col gap-2.5 p-3 sm:min-h-[17.5rem] sm:p-3.5">
        <div className="border-border/80 bg-card/40 relative flex min-h-[4.75rem] flex-1 items-center justify-center overflow-hidden rounded-sm border sm:min-h-[5.5rem]">
          <span className="border-border/80 absolute top-2 left-2 h-4 w-8 rounded-[1px] border" />
          <span className="border-border/70 h-8 w-[42%] rounded-sm border sm:h-9" />
          <span className="bg-foreground/10 absolute right-3 bottom-3 h-px w-10" />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0 flex-1">
            <span className="bg-foreground/16 block h-px w-[54%]" />
            <span className="bg-foreground/8 mt-1.5 block h-px w-[32%]" />
          </span>
          <div className="flex gap-1">
            <span className="border-border size-2.5 rounded-full border" />
            <span className="border-accent/30 bg-accent/15 size-2.5 rounded-full border" />
            <span className="border-border size-2.5 rounded-full border" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {["00", "00", "00"].map((unit, index) => (
            <span
              key={`drop-unit-${index}`}
              className="flex items-center gap-1.5"
            >
              {index > 0 ? (
                <span className="text-muted/50 text-[0.5rem]">:</span>
              ) : null}
              <span className="border-border bg-card/70 text-muted inline-flex h-7 min-w-8 items-center justify-center rounded-sm border px-1.5 text-[0.625rem] tracking-[0.14em]">
                {unit}
              </span>
            </span>
          ))}
          <span className="bg-foreground/8 ml-auto h-px w-8" />
        </div>

        <div className="border-border/80 bg-card/40 rounded-sm border px-2.5 py-2">
          <div className="flex items-center gap-2">
            <span className="bg-foreground/12 h-px w-10" />
            <span className="text-muted ml-auto text-[0.5rem] tracking-[0.16em] uppercase">
              Hold
            </span>
          </div>
          <span className="bg-foreground/8 mt-2 block h-1 w-full overflow-hidden rounded-full">
            <span className="bg-accent/45 block h-full w-[38%] rounded-full" />
          </span>
        </div>
      </div>
    </VisualChrome>
  );
}

function ProjectVisual({ id }: { id: string }) {
  switch (id) {
    case "uapp-portal":
      return <UappVisual />;
    case "connectify":
      return <ConnectifyVisual />;
    case "sneakerdrop":
      return <SneakerDropVisual />;
    default:
      return null;
  }
}

function ProjectHeading({
  project,
  featured = false,
}: {
  project: ShowcaseProject;
  featured?: boolean;
}) {
  return (
    <>
      <h3
        className={cn(
          "font-semibold tracking-tight text-balance motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5",
          featured
            ? "text-2xl sm:text-[1.75rem] lg:text-3xl"
            : "text-lg sm:text-xl",
        )}
      >
        {project.title}
      </h3>
      <p className="text-muted mt-1.5 text-sm tracking-wide">
        {project.category}
      </p>
      <p
        className={cn(
          "text-muted mt-3 leading-relaxed text-pretty sm:mt-4",
          featured ? "text-sm sm:text-base" : "text-sm",
        )}
      >
        {project.description}
      </p>
    </>
  );
}

function FeaturedProject({
  project,
  index,
}: {
  project: ShowcaseProject;
  index: string;
}) {
  return (
    <article
      className={cn(
        cardClassName,
        "grid lg:grid-cols-[minmax(0,1.6fr)_minmax(19rem,1fr)]",
      )}
    >
      <span
        aria-hidden="true"
        className="bg-accent/50 absolute top-0 left-6 h-px w-10"
      />

      <div className="border-border min-w-0 border-b lg:border-r lg:border-b-0">
        <VisualFrame className="h-full">
          <ProjectVisual id={project.id} />
        </VisualFrame>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <ProjectIndex value={index} />
            <span aria-hidden="true" className="bg-border h-px w-5" />
            <span className="text-muted text-[0.625rem] font-medium tracking-[0.18em] uppercase">
              {SHOWCASE_LABEL}
            </span>
          </div>
          <ProjectArrow />
        </div>

        <div className="mt-8 lg:mt-10">
          <ProjectHeading project={project} featured />
          <ProjectTags technologies={project.technologies} />
        </div>
      </div>
    </article>
  );
}

function SupportingProject({
  project,
  index,
}: {
  project: ShowcaseProject;
  index: string;
}) {
  return (
    <article className={cn(cardClassName, "flex h-full flex-col")}>
      <div className="border-border min-w-0 border-b">
        <VisualFrame>
          <ProjectVisual id={project.id} />
        </VisualFrame>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <ProjectIndex value={index} />
            <span aria-hidden="true" className="bg-border h-px w-4" />
            <span className="text-muted text-[0.625rem] font-medium tracking-[0.18em] uppercase">
              {SHOWCASE_LABEL}
            </span>
          </div>
          <ProjectArrow />
        </div>

        <div className="mt-8 flex-1">
          <ProjectHeading project={project} />
        </div>
        <ProjectTags technologies={project.technologies} />
      </div>
    </article>
  );
}

export function SelectedWork() {
  const [featured, ...supporting] = selectedWork;

  if (!featured) {
    return null;
  }

  return (
    <Section
      id="selected-work"
      background="secondary"
      aria-labelledby="selected-work-heading"
      className="scroll-mt-(--header-height)"
    >
      <Container>
        <div className="flex max-w-2xl flex-col">
          <Reveal>
            <p className="text-muted flex items-center gap-2.5 text-[0.6875rem] font-medium tracking-[0.22em] uppercase sm:text-xs">
              <span
                aria-hidden="true"
                className="bg-accent size-1.5 shrink-0 rounded-full"
              />
              {EYEBROW}
            </p>
          </Reveal>

          <Reveal className="mt-4 sm:mt-5" delay={0.06}>
            <h2
              id="selected-work-heading"
              className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-balance sm:text-4xl lg:text-[2.75rem]"
            >
              {HEADING}
            </h2>
          </Reveal>

          <Reveal className="mt-4 sm:mt-5" delay={0.12}>
            <p className="text-muted text-base leading-relaxed text-pretty sm:text-lg">
              {DESCRIPTION}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:mt-14 lg:mt-16 lg:gap-5">
          <Reveal delay={0.18}>
            <FeaturedProject project={featured} index={formatIndex(1)} />
          </Reveal>

          <Reveal className="grid gap-4 md:grid-cols-2 lg:gap-5" delay={0.28}>
            {supporting.map((project, index) => (
              <SupportingProject
                key={project.id}
                project={project}
                index={formatIndex(index + 2)}
              />
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
