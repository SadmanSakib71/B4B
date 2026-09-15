"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from "motion/react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { processSteps } from "@/data/site";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types/site";

const EYEBROW = "Our Process";
const HEADING = "From Idea To Product.";
const DESCRIPTION =
  "A focused process keeps ideas clear, decisions intentional, and products moving forward — from the first conversation to continuous improvement.";

const STEP_COUNT = processSteps.length;
const LAST_STEP_INDEX = STEP_COUNT - 1;
const INTRO_NODE_DELAY = 520;

const PROGRESS_SPRING = {
  stiffness: 90,
  damping: 26,
  mass: 0.35,
  restDelta: 0.001,
} as const;

const MODULE_TRANSITION = {
  duration: 0.4,
  ease: "easeInOut",
} as const;

const STEP_MODULES: Record<string, readonly [string, string]> = {
  understand: ["Users", "Goals"],
  plan: ["Scope", "Architecture"],
  build: ["Interface", "System"],
  validate: ["Review", "Refine"],
  evolve: ["Improve", "Adapt"],
};

const SYSTEM_GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
} as const;

type StepStatus = "past" | "active" | "future";

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

function getStepStatus(index: number, activeIndex: number): StepStatus {
  if (activeIndex < 0) {
    return "future";
  }

  if (index < activeIndex) {
    return "past";
  }

  if (index === activeIndex) {
    return "active";
  }

  return "future";
}

function progressToIndex(progress: number) {
  return Math.min(
    LAST_STEP_INDEX,
    Math.max(0, Math.round(progress * LAST_STEP_INDEX)),
  );
}

function ProgressFill({
  progress,
}: {
  progress: MotionValue<number> | number;
}) {
  return (
    <motion.span
      className="bg-accent/40 absolute inset-0 origin-top"
      style={{ scaleY: progress }}
    />
  );
}

function ModuleChip({ label }: { label: string }) {
  return (
    <span className="border-accent/20 bg-accent/5 text-foreground/80 inline-flex w-fit rounded-sm border px-2 py-1 text-[0.5625rem] font-medium tracking-[0.16em] uppercase">
      {label}
    </span>
  );
}

function ProcessModules({
  labels,
  reduceMotion,
}: {
  labels: readonly [string, string];
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return (
      <div className="flex flex-col items-start gap-1.5">
        {labels.map((label) => (
          <ModuleChip key={label} label={label} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-start gap-1.5"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={MODULE_TRANSITION}
    >
      {labels.map((label) => (
        <ModuleChip key={label} label={label} />
      ))}
    </motion.div>
  );
}

function ProcessNode({
  status,
  pulse,
  reduceMotion,
}: {
  status: StepStatus;
  pulse: boolean;
  reduceMotion: boolean;
}) {
  return (
    <span className="relative inline-flex size-3 items-center justify-center">
      {pulse && !reduceMotion ? (
        <motion.span
          className="bg-accent/35 absolute size-2.5 rounded-full"
          initial={{ scale: 1, opacity: 0.55 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ) : null}
      <span
        className={cn(
          "relative size-2.5 rounded-full border transition-[background-color,border-color,box-shadow] duration-500 ease-in-out motion-reduce:transition-none",
          status === "active" &&
            "border-accent bg-accent shadow-[0_0_0_3px_rgba(183,255,60,0.14)]",
          status === "past" && "border-foreground/40 bg-foreground/40",
          status === "future" && "border-foreground/25 bg-transparent",
        )}
      />
    </span>
  );
}

function ProcessVisual({
  activeIndex,
  entered,
  reduceMotion,
  progress,
}: {
  activeIndex: number;
  entered: boolean;
  reduceMotion: boolean;
  progress: MotionValue<number> | number;
}) {
  const displayIndex = entered ? activeIndex : -1;
  const activeStep = processSteps[entered ? activeIndex : 0] ?? processSteps[0];

  if (!activeStep) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="border-border/80 bg-card/40 relative overflow-hidden rounded-lg border"
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

      <div className="relative flex h-[min(32rem,calc(100vh-var(--header-height)-4.5rem))] min-h-[26rem] flex-col">
        <div className="border-border/80 flex items-start justify-between gap-4 border-b px-4 py-3 sm:px-5">
          <span className="text-muted text-[0.625rem] font-medium tracking-[0.18em] uppercase">
            System
          </span>
          <div className="min-w-0 text-right">
            <p
              className={cn(
                "text-[0.625rem] font-medium tracking-[0.18em] transition-colors duration-500 ease-in-out motion-reduce:transition-none",
                entered ? "text-foreground" : "text-muted",
              )}
            >
              {formatIndex((entered ? activeIndex : 0) + 1)}
            </p>
            <div className="relative mt-1 h-4 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeStep.id}
                  className="text-foreground absolute inset-0 text-xs font-medium tracking-tight"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    ease: "easeInOut",
                  }}
                >
                  {activeStep.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 py-6 sm:px-5 sm:py-7">
          <div className="relative flex h-full flex-col justify-between">
            <div className="pointer-events-none absolute top-[1.375rem] bottom-[1.375rem] left-[calc(1.75rem+0.75rem+0.375rem)] w-px">
              <span className="bg-foreground/15 absolute inset-0" />
              <ProgressFill progress={progress} />
            </div>

            {processSteps.map((step, index) => {
              const status = getStepStatus(index, displayIndex);
              const labels = STEP_MODULES[step.id];

              return (
                <div
                  key={step.id}
                  className="relative z-10 grid grid-cols-[1.75rem_0.75rem_minmax(0,1fr)] items-center gap-x-3"
                >
                  <span
                    className={cn(
                      "text-[0.625rem] font-medium tracking-[0.18em] transition-colors duration-500 ease-in-out motion-reduce:transition-none",
                      status === "active" && "text-foreground",
                      status === "past" && "text-muted",
                      status === "future" && "text-muted/45",
                    )}
                  >
                    {formatIndex(index + 1)}
                  </span>

                  <ProcessNode
                    status={status}
                    pulse={status === "active"}
                    reduceMotion={reduceMotion}
                  />

                  <div className="flex min-h-[2.75rem] items-center">
                    <AnimatePresence>
                      {status === "active" && labels ? (
                        <ProcessModules
                          key={step.id}
                          labels={labels}
                          reduceMotion={reduceMotion}
                        />
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessStepItem({
  step,
  index,
  status,
  reduceMotion,
}: {
  step: ProcessStep;
  index: number;
  status: StepStatus;
  reduceMotion: boolean;
}) {
  const isLast = index === LAST_STEP_INDEX;

  return (
    <li
      aria-current={status === "active" ? "step" : undefined}
      className={cn(
        "relative grid grid-cols-[1.25rem_minmax(0,1fr)] gap-4 lg:block lg:min-h-[42vh] lg:py-4",
        !isLast && "pb-10 sm:pb-12 lg:pb-0",
      )}
    >
      <div className="relative z-10 flex justify-center pt-1.5 lg:hidden">
        <ProcessNode
          status={status}
          pulse={status === "active"}
          reduceMotion={reduceMotion}
        />
      </div>

      <article
        className={cn(
          "relative min-w-0 lg:flex lg:h-full lg:flex-col lg:justify-center lg:pl-6",
          "transition-opacity duration-500 ease-in-out motion-reduce:transition-none",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "bg-accent/70 absolute top-1/2 left-0 hidden h-8 w-px -translate-y-1/2 lg:block",
            "origin-center transition-opacity duration-500 ease-in-out motion-reduce:transition-none",
            status === "active" ? "opacity-100" : "opacity-0",
          )}
        />

        <p
          aria-hidden="true"
          className={cn(
            "relative w-fit text-[0.6875rem] font-medium tracking-[0.18em] transition-colors duration-500 ease-in-out motion-reduce:transition-none",
            status === "active" && "text-foreground",
            status === "past" && "text-muted",
            status === "future" && "text-muted/55",
          )}
        >
          {formatIndex(index + 1)}
          <span
            className={cn(
              "absolute top-full left-0 mt-1 h-px w-3.5 transition-colors duration-500 ease-in-out motion-reduce:transition-none",
              status === "active" ? "bg-accent/60" : "bg-transparent",
            )}
          />
        </p>

        <h3
          className={cn(
            "mt-3 text-2xl font-semibold tracking-tight text-balance transition-colors duration-500 ease-in-out motion-reduce:transition-none sm:text-[1.75rem] lg:mt-4 lg:text-3xl",
            status === "active" && "text-foreground",
            status === "past" && "text-foreground/75",
            status === "future" && "text-muted",
          )}
        >
          {step.title}
        </h3>

        <p
          className={cn(
            "mt-3 max-w-xl text-sm leading-relaxed text-pretty transition-[color,opacity] duration-500 ease-in-out motion-reduce:transition-none sm:mt-4 sm:text-base",
            status === "active" && "text-muted opacity-100",
            status === "past" && "text-muted opacity-80",
            status === "future" && "text-muted opacity-70",
          )}
        >
          {step.description}
        </p>
      </article>
    </li>
  );
}

export function Process() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [introReady, setIntroReady] = useState(false);
  const trackInView = useInView(trackRef, { once: true, amount: 0.12 });

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.4", "end 0.62"],
  });

  const smoothProgress = useSpring(scrollYProgress, PROGRESS_SPRING);
  const entered = Boolean(reduceMotion) || introReady;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = progressToIndex(latest);
    setActiveIndex((current) => (current === next ? current : next));
  });

  useEffect(() => {
    if (reduceMotion || introReady || !trackInView) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIntroReady(true);
    }, INTRO_NODE_DELAY);

    return () => window.clearTimeout(timeout);
  }, [introReady, reduceMotion, trackInView]);

  const displayIndex = entered ? activeIndex : -1;
  const lineProgress =
    reduceMotion || !entered
      ? entered
        ? activeIndex / LAST_STEP_INDEX
        : 0
      : smoothProgress;

  return (
    <Section
      id="process"
      aria-labelledby="process-heading"
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
              id="process-heading"
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

        <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-[minmax(16.5rem,19rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(18rem,21rem)_minmax(0,1fr)] xl:gap-16">
          <div className="hidden min-w-0 lg:block">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]">
              <Reveal delay={0.18}>
                <ProcessVisual
                  activeIndex={activeIndex}
                  entered={entered}
                  reduceMotion={Boolean(reduceMotion)}
                  progress={lineProgress}
                />
              </Reveal>
            </div>
          </div>

          <div ref={trackRef} className="relative min-w-0">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[0.7rem] bottom-[0.7rem] left-[0.625rem] w-px -translate-x-1/2 lg:hidden"
            >
              <span className="bg-foreground/15 absolute inset-0" />
              <ProgressFill progress={lineProgress} />
            </span>
            <ol>
              {processSteps.map((step, index) => (
                <ProcessStepItem
                  key={step.id}
                  step={step}
                  index={index}
                  status={getStepStatus(index, displayIndex)}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
