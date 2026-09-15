"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { motionDuration, motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EYEBROW = "About B4B";
const HEADING = "Built For What Comes Next.";
const DESCRIPTION =
  "B4B is a software company focused on designing and building digital products that solve real problems. We combine product thinking, thoughtful design, and solid engineering to create software that is useful today and ready to evolve tomorrow.";
const SECONDARY =
  "We believe good software is more than a collection of features. It needs a clear purpose, a strong technical foundation, and an experience that makes sense for the people using it.";
const STATEMENT = "Built in Bangladesh. Designed to go further.";

const LIFECYCLE_STAGES = [
  {
    id: "idea",
    title: "Idea",
    details: ["Problem", "Users", "Goals"],
  },
  {
    id: "product",
    title: "Product",
    details: ["Design", "Engineering", "Experience"],
  },
  {
    id: "evolution",
    title: "Evolution",
    details: ["Feedback", "Iteration", "Scale"],
  },
] as const;

const STAGE_DELAYS = [0.24, 0.46, 0.68] as const;
const LINE_DELAYS = [0.36, 0.58] as const;
const TICK_DELAYS = [0.3, 0.52, 0.74] as const;

const TICK_CLASS = ["lg:w-3", "lg:w-10 xl:w-14", "lg:w-20 xl:w-28"] as const;

const SYSTEM_GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
} as const;

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

function SpineNode({
  active,
  revealed,
  reduceMotion,
  delay,
}: {
  active: boolean;
  revealed: boolean;
  reduceMotion: boolean;
  delay: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="relative z-10 inline-flex size-3 shrink-0 items-center justify-center"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={
        revealed || reduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.6 }
      }
      transition={{
        duration: reduceMotion ? 0 : motionDuration.base,
        delay: reduceMotion ? 0 : delay,
        ease: motionEase,
      }}
    >
      <span
        className={cn(
          "size-1.5 rounded-full border transition-[background-color,border-color] duration-300 motion-reduce:transition-none",
          active
            ? "border-accent bg-accent"
            : "border-foreground/35 bg-transparent",
        )}
      />
    </motion.span>
  );
}

function SpineLine({
  revealed,
  reduceMotion,
  delay,
  active,
}: {
  revealed: boolean;
  reduceMotion: boolean;
  delay: number;
  active: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative ml-[0.375rem] flex h-11 w-3 shrink-0 justify-center lg:h-12"
    >
      <motion.span
        className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2"
        initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
        animate={
          revealed || reduceMotion
            ? { scaleY: 1, opacity: 1 }
            : { scaleY: 0, opacity: 0 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.4,
          delay: reduceMotion ? 0 : delay,
          ease: motionEase,
        }}
      >
        <span
          className={cn(
            "absolute inset-0 transition-colors duration-300 motion-reduce:transition-none",
            active ? "bg-accent/50" : "bg-foreground/18",
          )}
        />
      </motion.span>
    </div>
  );
}

function HorizontalTick({
  className,
  revealed,
  reduceMotion,
  delay,
  active,
}: {
  className: string;
  revealed: boolean;
  reduceMotion: boolean;
  delay: number;
  active: boolean;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "relative hidden h-px shrink-0 origin-left lg:block",
        className,
      )}
      initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
      animate={
        revealed || reduceMotion
          ? { scaleX: 1, opacity: 1 }
          : { scaleX: 0, opacity: 0 }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : delay,
        ease: motionEase,
      }}
    >
      <span
        className={cn(
          "absolute inset-0 transition-colors duration-300 motion-reduce:transition-none",
          active ? "bg-accent/45" : "bg-foreground/15",
        )}
      />
    </motion.span>
  );
}

function SignalTrack() {
  return (
    <span
      aria-hidden="true"
      className="[container-type:size] pointer-events-none absolute top-[0.7rem] bottom-[0.7rem] left-[0.375rem] z-0 w-3 -translate-x-1/2"
    >
      <span className="bg-accent/70 absolute top-0 left-1/2 size-1 -translate-x-1/2 rounded-full motion-safe:[animation:tech-signal-y_8.5s_ease-in-out_infinite] motion-reduce:hidden" />
    </span>
  );
}

function LifecycleModule({
  stage,
  index,
  active,
  revealed,
  reduceMotion,
  delay,
  onActivate,
}: {
  stage: (typeof LIFECYCLE_STAGES)[number];
  index: number;
  active: boolean;
  revealed: boolean;
  reduceMotion: boolean;
  delay: number;
  onActivate: (id: number) => void;
}) {
  return (
    <motion.article
      className="min-w-0 flex-1 lg:w-[min(100%,17.5rem)] lg:flex-none"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={
        revealed || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
      }
      transition={{
        duration: reduceMotion ? 0 : motionDuration.slow,
        delay: reduceMotion ? 0 : delay,
        ease: motionEase,
      }}
      onMouseEnter={() => onActivate(index)}
    >
      <div
        className={cn(
          "border-border bg-card rounded-lg border px-3.5 py-3.5 transition-[border-color,transform] duration-300 motion-reduce:transition-none sm:px-4 sm:py-4",
          active && "border-foreground/25",
          !reduceMotion && active && "-translate-y-1",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              "text-[0.625rem] font-medium tracking-[0.18em] transition-colors duration-300 motion-reduce:transition-none",
              active ? "text-foreground" : "text-muted",
            )}
          >
            {formatIndex(index + 1)}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full border transition-[background-color,border-color] duration-300 motion-reduce:transition-none",
              active
                ? "border-accent bg-accent"
                : "border-foreground/30 bg-transparent",
            )}
          />
        </div>

        <h3 className="mt-3 text-base font-semibold tracking-tight sm:text-lg">
          {stage.title}
        </h3>

        <ul className="mt-3 flex flex-col gap-1.5">
          {stage.details.map((detail) => (
            <li
              key={detail}
              className="text-muted flex items-center gap-2 text-xs leading-4"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-1 shrink-0 rounded-full border transition-[background-color,border-color] duration-300 motion-reduce:transition-none",
                  active
                    ? "border-accent/70 bg-accent/70"
                    : "border-foreground/25 bg-transparent",
                )}
              />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function isLineActive(lineIndex: number, hovered: number | null) {
  if (hovered === null) {
    return false;
  }

  return hovered === lineIndex || hovered === lineIndex + 1;
}

function LifecycleVisual() {
  const reduceMotion = Boolean(useReducedMotion());
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, amount: 0.22 });
  const revealed = reduceMotion || inView;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div ref={panelRef} onMouseLeave={() => setHovered(null)}>
      <motion.div
        className="border-border bg-secondary relative overflow-hidden rounded-lg border"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={
          revealed || reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={{
          duration: reduceMotion ? 0 : motionDuration.slow,
          delay: reduceMotion ? 0 : 0.08,
          ease: motionEase,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-45"
          style={{
            ...SYSTEM_GRID_STYLE,
            maskImage:
              "radial-gradient(ellipse 78% 72% at 50% 48%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 78% 72% at 50% 48%, black, transparent)",
          }}
        />

        <span
          aria-hidden="true"
          className="border-foreground/20 absolute top-0 left-0 h-2.5 w-2.5 border-t border-l"
        />
        <span
          aria-hidden="true"
          className="border-foreground/20 absolute top-0 right-0 h-2.5 w-2.5 border-t border-r"
        />
        <span
          aria-hidden="true"
          className="border-foreground/20 absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l"
        />
        <span
          aria-hidden="true"
          className="border-foreground/20 absolute right-0 bottom-0 h-2.5 w-2.5 border-r border-b"
        />

        <div className="relative">
          <motion.div
            className="border-border/80 relative flex flex-col items-start justify-between gap-2 border-b px-4 py-3 sm:flex-row sm:items-start sm:gap-4 sm:px-5"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={
              revealed || reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
            }
            transition={{
              duration: reduceMotion ? 0 : motionDuration.slow,
              delay: reduceMotion ? 0 : 0.16,
              ease: motionEase,
            }}
          >
            <p className="text-[0.625rem] font-medium tracking-[0.18em] uppercase">
              <span className="text-foreground">B4B</span>
              <span className="text-muted"> / Product System</span>
            </p>
            <p className="text-muted flex min-w-0 flex-wrap items-center justify-start gap-x-1.5 text-[0.625rem] font-medium tracking-[0.16em] uppercase sm:justify-end">
              <span>Build</span>
              <span aria-hidden="true" className="text-foreground/25">
                →
              </span>
              <span>Learn</span>
              <span aria-hidden="true" className="text-foreground/25">
                →
              </span>
              <span>Evolve</span>
            </p>
          </motion.div>

          <div className="relative px-4 py-5 sm:px-5 sm:py-6 lg:px-6 lg:py-7">
            {reduceMotion ? null : <SignalTrack />}

            <ol
              aria-label="Product lifecycle from idea to evolution"
              className="relative"
            >
              {LIFECYCLE_STAGES.map((stage, index) => {
                const isLast = index === LIFECYCLE_STAGES.length - 1;

                return (
                  <li key={stage.id}>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <SpineNode
                        active={hovered === index}
                        revealed={revealed}
                        reduceMotion={reduceMotion}
                        delay={STAGE_DELAYS[index] ?? 0.24}
                      />
                      <HorizontalTick
                        className={TICK_CLASS[index] ?? TICK_CLASS[0]}
                        revealed={revealed}
                        reduceMotion={reduceMotion}
                        delay={TICK_DELAYS[index] ?? 0.3}
                        active={hovered === index}
                      />
                      <LifecycleModule
                        stage={stage}
                        index={index}
                        active={hovered === index}
                        revealed={revealed}
                        reduceMotion={reduceMotion}
                        delay={STAGE_DELAYS[index] ?? 0.24}
                        onActivate={setHovered}
                      />
                    </div>

                    {isLast ? null : (
                      <SpineLine
                        revealed={revealed}
                        reduceMotion={reduceMotion}
                        delay={LINE_DELAYS[index] ?? 0.36}
                        active={isLineActive(index, hovered)}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          <motion.div
            aria-hidden="true"
            className="border-border/80 flex items-center justify-between gap-3 border-t px-4 py-2.5 sm:px-5"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={revealed || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : motionDuration.base,
              delay: reduceMotion ? 0 : 0.82,
              ease: motionEase,
            }}
          >
            <span className="text-muted min-w-0 text-[0.5625rem] leading-relaxed font-medium tracking-[0.16em] uppercase">
              Idea → Product → Evolution
            </span>
            {reduceMotion ? (
              <span className="bg-accent size-1 rounded-full" />
            ) : (
              <motion.span
                className="bg-accent size-1 rounded-full"
                initial={{ opacity: 0 }}
                animate={
                  revealed ? { opacity: [0.35, 1, 0.35] } : { opacity: 0 }
                }
                transition={
                  revealed
                    ? {
                        duration: 4.8,
                        delay: 0.82,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { duration: 0 }
                }
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function About() {
  return (
    <Section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-(--header-height)"
    >
      <Container>
        <div className="grid items-start gap-10 md:gap-12 lg:grid-cols-[minmax(0,42%)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <div className="max-w-xl lg:max-w-none">
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
                id="about-heading"
                className="text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.04em] text-balance sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.75rem]"
              >
                {HEADING}
              </h2>
            </Reveal>

            <Reveal className="mt-4 sm:mt-5" delay={0.12}>
              <p className="text-muted max-w-md text-base leading-relaxed text-pretty sm:text-lg">
                {DESCRIPTION}
              </p>
            </Reveal>

            <Reveal className="mt-4 sm:mt-5" delay={0.18}>
              <p className="text-muted max-w-md text-sm leading-relaxed text-pretty sm:text-base">
                {SECONDARY}
              </p>
            </Reveal>

            <Reveal className="mt-8 sm:mt-10" delay={0.24}>
              <p className="text-muted flex items-start gap-2.5 text-[0.6875rem] leading-relaxed font-medium tracking-[0.16em] uppercase">
                <span
                  aria-hidden="true"
                  className="bg-accent mt-[0.35rem] size-1.5 shrink-0 rounded-full"
                />
                {STATEMENT}
              </p>
            </Reveal>
          </div>

          <div className="min-w-0">
            <LifecycleVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}
