import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Principle } from "@/types/site";

const EYEBROW = "Why B4B";
const HEADING = "Built With Product Thinking.";
const DESCRIPTION =
  "We look beyond the feature list. Every product decision is shaped by usability, business goals, technical foundations, and the ability to grow over time.";

const SYSTEM_STAGES = [
  { id: "think", label: "Think", accent: false },
  { id: "design", label: "Design", accent: false },
  { id: "build", label: "Build", accent: true },
  { id: "evolve", label: "Evolve", accent: false },
] as const;

const SYSTEM_GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
} as const;

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

function SystemVisual() {
  return (
    <div
      aria-hidden="true"
      className="border-border/80 bg-card/40 relative min-h-[17.5rem] overflow-hidden rounded-lg border"
    >
      <div
        className="absolute inset-0 opacity-45"
        style={{
          ...SYSTEM_GRID_STYLE,
          maskImage:
            "radial-gradient(ellipse 78% 72% at 50% 48%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 72% at 50% 48%, black, transparent)",
        }}
      />

      <span className="border-foreground/20 absolute top-0 left-0 h-2.5 w-2.5 border-t border-l" />
      <span className="border-foreground/20 absolute top-0 right-0 h-2.5 w-2.5 border-t border-r" />
      <span className="border-foreground/20 absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l" />
      <span className="border-foreground/20 absolute right-0 bottom-0 h-2.5 w-2.5 border-r border-b" />

      <div className="relative flex h-full min-h-[17.5rem] flex-col justify-center px-5 py-6 sm:px-6">
        {SYSTEM_STAGES.map((stage, index) => (
          <div key={stage.id}>
            {index > 0 ? (
              <div className="flex pl-[0.21875rem]">
                <span
                  className={
                    stage.accent
                      ? "bg-accent/35 h-5 w-px"
                      : "bg-foreground/15 h-5 w-px"
                  }
                />
              </div>
            ) : null}

            <div className="flex items-center gap-3">
              <span
                className={
                  stage.accent
                    ? "bg-accent/80 size-1.5 shrink-0 rounded-full"
                    : "border-foreground/30 size-1.5 shrink-0 rounded-full border"
                }
              />
              <span className="bg-foreground/15 h-px w-3.5 shrink-0 sm:w-5" />
              <span
                className={cn(
                  "flex-1 rounded-sm border px-2.5 py-2 text-[0.625rem] font-medium tracking-[0.18em] uppercase",
                  stage.accent
                    ? "border-accent/25 bg-accent/5 text-foreground"
                    : "border-border bg-secondary/80 text-muted",
                )}
              >
                {stage.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrincipleRow({
  principle,
  index,
}: {
  principle: Principle;
  index: string;
}) {
  return (
    <article className="grid gap-3 py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-start sm:gap-8 sm:py-10 lg:grid-cols-[5.5rem_minmax(0,1fr)] lg:gap-10 lg:py-12">
      <span
        aria-hidden="true"
        className="text-muted group-hover:text-foreground relative inline-block w-fit text-[0.6875rem] font-medium tracking-[0.18em] transition-colors duration-200 motion-reduce:transition-none"
      >
        {index}
        <span className="bg-accent/0 group-hover:bg-accent/50 absolute top-full left-0 mt-1 h-px w-3.5 transition-colors duration-200 motion-reduce:transition-none" />
      </span>

      <div className="min-w-0">
        <h3 className="text-xl font-semibold tracking-tight text-balance motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 sm:text-2xl">
          {principle.title}
        </h3>
        <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed text-pretty sm:mt-4 sm:text-base">
          {principle.description}
        </p>
      </div>
    </article>
  );
}

export function WhyB4B() {
  return (
    <Section
      id="why-b4b"
      aria-labelledby="why-b4b-heading"
      className="scroll-mt-(--header-height)"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_18.5rem] xl:gap-20">
          <div className="max-w-xl">
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
                id="why-b4b-heading"
                className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-balance sm:text-4xl lg:text-[2.75rem] xl:text-5xl"
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

          <Reveal
            className="mx-auto w-full max-w-[18rem] lg:mx-0 lg:max-w-none"
            delay={0.18}
          >
            <SystemVisual />
          </Reveal>
        </div>

        <div className="border-border mt-16 border-t sm:mt-20 lg:mt-24">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.id}
              className="border-border/80 group hover:border-foreground/20 border-b transition-colors duration-200 last:border-b-0 motion-reduce:transition-none"
              delay={0.24 + index * 0.06}
            >
              <PrincipleRow
                principle={principle}
                index={formatIndex(index + 1)}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
