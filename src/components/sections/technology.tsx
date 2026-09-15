"use client";

import { Fragment, useRef, useState, type FocusEvent } from "react";
import { AppWindow, Database, GitBranch, Server, Workflow } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { technologyGroups } from "@/data/site";
import { motionDuration, motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { TechnologyGroup } from "@/types/site";

const EYEBROW = "Technology";
const HEADING = "The Technology Behind The Products.";
const DESCRIPTION =
  "We choose technologies based on the product, the problem, and the scale — building systems that are practical today and ready to evolve tomorrow.";
const STATEMENT =
  "We choose technology around the product, not the other way around.";

const SYSTEM_GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
} as const;

const GROUP_ICONS = {
  frontend: AppWindow,
  backend: Server,
  data: Database,
  "ai-automation": Workflow,
  engineering: GitBranch,
} as const;

const DESKTOP_AREA: Record<string, string> = {
  frontend: "front",
  backend: "back",
  data: "data",
  "ai-automation": "ai",
  engineering: "eng",
};

const ECOSYSTEM_AREAS = `
  ". . ai . ."
  ". . v1 . ."
  "front h1 core h2 back"
  ". . v2 . ."
  ". . data . ."
  ". . v3 . ."
  ". . eng . ."
`;

const CONNECTIONS = [
  {
    id: "v1",
    area: "v1",
    axis: "y",
    origin: "bottom",
    reverse: false,
    groups: ["ai-automation"],
    delay: 0.64,
    signalDelay: "0.4s",
  },
  {
    id: "h1",
    area: "h1",
    axis: "x",
    origin: "right",
    reverse: false,
    groups: ["frontend"],
    delay: 0.72,
    signalDelay: "1.8s",
  },
  {
    id: "h2",
    area: "h2",
    axis: "x",
    origin: "left",
    reverse: true,
    groups: ["backend"],
    delay: 0.72,
    signalDelay: "3.2s",
  },
  {
    id: "v2",
    area: "v2",
    axis: "y",
    origin: "top",
    reverse: true,
    groups: ["data", "engineering"],
    delay: 0.8,
    signalDelay: "4.6s",
  },
  {
    id: "v3",
    area: "v3",
    axis: "y",
    origin: "top",
    reverse: true,
    groups: ["engineering"],
    delay: 0.88,
    signalDelay: "2.6s",
  },
] as const;

type ConnectionDef = (typeof CONNECTIONS)[number];

function GroupIcon({ id }: { id: string }) {
  const Icon =
    id in GROUP_ICONS ? GROUP_ICONS[id as keyof typeof GROUP_ICONS] : AppWindow;

  return (
    <Icon
      aria-hidden="true"
      size={14}
      strokeWidth={1.75}
      className="shrink-0"
    />
  );
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-1.5 shrink-0 rounded-full border transition-[background-color,border-color] duration-300 motion-reduce:transition-none",
        active
          ? "border-accent bg-accent"
          : "border-foreground/30 bg-transparent",
      )}
    />
  );
}

function SignalDot({
  axis,
  reverse,
  delay,
  emphasized,
}: {
  axis: "x" | "y";
  reverse: boolean;
  delay: string;
  emphasized: boolean;
}) {
  return (
    <span
      className={cn(
        "[container-type:size] pointer-events-none absolute",
        axis === "y"
          ? "inset-y-0 left-1/2 w-3 -translate-x-1/2"
          : "inset-x-0 top-1/2 h-3 -translate-y-1/2",
        reverse && "rotate-180",
      )}
    >
      <span
        className={cn(
          "absolute rounded-full motion-reduce:hidden",
          axis === "y"
            ? "top-0 left-1/2 size-1 -translate-x-1/2 motion-safe:[animation:tech-signal-y_7.5s_ease-in-out_infinite]"
            : "top-1/2 left-0 size-1 -translate-y-1/2 motion-safe:[animation:tech-signal-x_7.5s_ease-in-out_infinite]",
          emphasized ? "bg-accent" : "bg-accent/55",
        )}
        style={{ animationDelay: delay }}
      />
    </span>
  );
}

function Connection({
  connection,
  active,
  revealed,
  reduceMotion,
}: {
  connection: ConnectionDef;
  active: boolean;
  revealed: boolean;
  reduceMotion: boolean;
}) {
  const isY = connection.axis === "y";
  const originClass = {
    top: "origin-top",
    bottom: "origin-bottom",
    left: "origin-left",
    right: "origin-right",
  }[connection.origin];

  return (
    <div
      aria-hidden="true"
      className="relative hidden h-full min-h-0 w-full lg:block"
      style={{ gridArea: connection.area }}
    >
      <motion.span
        className={cn(
          "absolute",
          isY
            ? "inset-y-0 left-1/2 w-px -translate-x-1/2"
            : "inset-x-0 top-1/2 h-px -translate-y-1/2",
          originClass,
        )}
        initial={
          reduceMotion
            ? false
            : { scaleX: isY ? 1 : 0, scaleY: isY ? 0 : 1, opacity: 0 }
        }
        animate={
          revealed || reduceMotion
            ? { scaleX: 1, scaleY: 1, opacity: 1 }
            : { scaleX: isY ? 1 : 0, scaleY: isY ? 0 : 1, opacity: 0 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.55,
          delay: reduceMotion ? 0 : connection.delay,
          ease: motionEase,
        }}
      >
        <span
          className={cn(
            "absolute inset-0 transition-colors duration-300 motion-reduce:transition-none",
            active ? "bg-accent/55" : "bg-foreground/20",
          )}
        />
      </motion.span>

      {reduceMotion ? null : (
        <SignalDot
          axis={connection.axis}
          reverse={connection.reverse}
          delay={connection.signalDelay}
          emphasized={active}
        />
      )}
    </div>
  );
}

function MobileConnector({
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
      className="relative mx-auto flex h-7 w-px shrink-0 items-center justify-center lg:hidden"
    >
      <motion.span
        className="absolute inset-0 origin-top"
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

function CenterNode({
  revealed,
  reduceMotion,
  responding,
}: {
  revealed: boolean;
  reduceMotion: boolean;
  responding: boolean;
}) {
  return (
    <motion.div
      className="relative z-10 w-full min-w-0"
      style={{ gridArea: "core" }}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={
        revealed || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
      }
      transition={{
        duration: reduceMotion ? 0 : motionDuration.slow,
        delay: reduceMotion ? 0 : 0.2,
        ease: motionEase,
      }}
    >
      <div
        className={cn(
          "border-border bg-card relative overflow-hidden rounded-lg border px-4 py-4 text-center transition-[border-color] duration-300 motion-reduce:transition-none sm:px-5 sm:py-5",
          responding && "border-accent/30",
        )}
      >
        {reduceMotion ? null : (
          <motion.span
            aria-hidden="true"
            className="border-accent/20 pointer-events-none absolute inset-0 rounded-lg border"
            animate={{ opacity: [0.18, 0.42, 0.18] }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        <span
          aria-hidden="true"
          className="bg-accent mx-auto mb-3 block size-1.5 rounded-full"
        />
        <p className="text-lg font-semibold tracking-tight">B4B</p>
        <p className="text-muted mt-1 text-[0.625rem] font-medium tracking-[0.18em] uppercase">
          Product System
        </p>
      </div>
    </motion.div>
  );
}

function GroupNode({
  group,
  active,
  quiet,
  revealed,
  reduceMotion,
  delay,
  onActivate,
}: {
  group: TechnologyGroup;
  active: boolean;
  quiet: boolean;
  revealed: boolean;
  reduceMotion: boolean;
  delay: number;
  onActivate: (id: string) => void;
}) {
  return (
    <motion.div
      className="relative z-10 w-full min-w-0 lg:self-center"
      style={{ gridArea: DESKTOP_AREA[group.id] }}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={
        revealed || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
      }
      transition={{
        duration: reduceMotion ? 0 : motionDuration.slow,
        delay: reduceMotion ? 0 : delay,
        ease: motionEase,
      }}
    >
      <button
        type="button"
        aria-label={`${group.category}: ${group.technologies.join(", ")}`}
        onMouseEnter={() => onActivate(group.id)}
        onFocus={() => onActivate(group.id)}
        className={cn(
          "border-border bg-card w-full rounded-lg border px-3.5 py-3 text-left transition-[border-color,transform,opacity] duration-300 motion-reduce:transition-none sm:px-4 sm:py-3.5",
          active && "border-foreground/25",
          !reduceMotion && active && "-translate-y-1",
          quiet && "opacity-[0.55]",
        )}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="text-muted flex min-w-0 items-center gap-2">
            <GroupIcon id={group.id} />
            <span className="text-[0.625rem] leading-tight font-medium tracking-[0.16em] uppercase">
              {group.category}
            </span>
          </span>
          <StatusDot active={active} />
        </span>

        <span className="mt-3 flex flex-col items-start gap-1">
          {group.technologies.map((technology, index) => (
            <motion.span
              key={technology}
              className="text-foreground decoration-foreground/25 text-xs leading-4 break-words underline-offset-2 transition-[color,opacity] duration-200 hover:underline motion-reduce:transition-none"
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={
                revealed || reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 4 }
              }
              transition={{
                duration: reduceMotion ? 0 : motionDuration.base,
                delay: reduceMotion ? 0 : delay + 0.16 + index * 0.035,
                ease: motionEase,
              }}
            >
              {technology}
            </motion.span>
          ))}
        </span>
      </button>
    </motion.div>
  );
}

function isConnectionActive(
  connection: ConnectionDef,
  activeGroup: string | null,
) {
  if (!activeGroup) {
    return false;
  }

  return (connection.groups as readonly string[]).includes(activeGroup);
}

function EcosystemVisual() {
  const reduceMotion = Boolean(useReducedMotion());
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, amount: 0.22 });
  const revealed = reduceMotion || inView;
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const clearIfLeaving = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setActiveGroup(null);
    }
  };

  return (
    <div
      ref={panelRef}
      onMouseLeave={() => setActiveGroup(null)}
      onBlur={clearIfLeaving}
    >
      <motion.div
        className="border-border bg-background relative overflow-hidden rounded-lg border"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={
          revealed || reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={{
          duration: reduceMotion ? 0 : motionDuration.slow,
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

        <div
          role="group"
          aria-label="Product technology ecosystem"
          className="relative flex min-w-0 flex-col px-4 py-5 sm:px-5 sm:py-6 lg:grid lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(10.5rem,13.5rem)_2.5rem_minmax(0,1fr)] lg:grid-rows-[auto_2.75rem_auto_2.75rem_auto_2.5rem_auto] lg:px-6 lg:py-7"
          style={{ gridTemplateAreas: ECOSYSTEM_AREAS }}
        >
          <CenterNode
            revealed={revealed}
            reduceMotion={reduceMotion}
            responding={Boolean(activeGroup)}
          />

          {technologyGroups.map((group, index) => (
            <Fragment key={group.id}>
              <MobileConnector
                revealed={revealed}
                reduceMotion={reduceMotion}
                delay={0.36 + index * 0.08}
                active={activeGroup === group.id}
              />
              <GroupNode
                group={group}
                active={activeGroup === group.id}
                quiet={Boolean(activeGroup) && activeGroup !== group.id}
                revealed={revealed}
                reduceMotion={reduceMotion}
                delay={0.32 + index * 0.08}
                onActivate={setActiveGroup}
              />
            </Fragment>
          ))}

          {CONNECTIONS.map((connection) => (
            <Connection
              key={connection.id}
              connection={connection}
              active={isConnectionActive(connection, activeGroup)}
              revealed={revealed}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Technology() {
  return (
    <Section
      id="technology"
      background="secondary"
      aria-labelledby="technology-heading"
      className="scroll-mt-(--header-height)"
    >
      <Container>
        <div className="grid items-start gap-10 md:gap-12 lg:grid-cols-[minmax(16.5rem,20rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(18rem,22.5rem)_minmax(0,1fr)] xl:gap-16">
          <div className="max-w-xl lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:max-w-none">
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
                id="technology-heading"
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

            <Reveal className="mt-8 sm:mt-10" delay={0.18}>
              <p className="text-foreground/85 flex items-start gap-3 text-sm leading-relaxed text-pretty">
                <span
                  aria-hidden="true"
                  className="bg-accent/70 mt-2 h-px w-6 shrink-0"
                />
                {STATEMENT}
              </p>
            </Reveal>
          </div>

          <div className="min-w-0">
            <EcosystemVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}
