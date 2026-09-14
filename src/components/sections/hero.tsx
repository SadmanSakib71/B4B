"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { motionDuration, motionEase } from "@/lib/motion";

const EYEBROW = "B4B — BUILT FOR BANGLADESH";
const DESCRIPTION =
  "We design and build scalable digital products, software solutions, and AI-powered experiences for ambitious businesses.";

const SECONDARY_CTA = {
  label: "Explore Our Work",
  href: "/work",
} as const;

const GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
} as const;

const NOISE_STYLE = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
} as const;

function HeroReveal({
  children,
  className,
  delay = 0,
  reduceMotion,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionDuration.slow,
        delay,
        ease: motionEase,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="hero-heading" className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_STYLE} />
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={NOISE_STYLE}
        />
        <div className="absolute top-[18%] right-[-12%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(183,255,60,0.09),transparent_68%)] sm:h-112 sm:w-md" />
        <div className="absolute top-0 right-0 h-full w-[58%] bg-[radial-gradient(ellipse_at_72%_38%,rgba(255,255,255,0.045),transparent_62%)]" />
      </div>

      <Container className="relative flex flex-col pt-[calc(var(--header-height)+2.75rem)] pb-16 sm:pb-20 lg:min-h-[88vh] lg:justify-center lg:pt-[calc(var(--header-height)+1.25rem)] lg:pb-16">
        <div className="relative z-10 max-w-xl">
          <HeroReveal reduceMotion={reduceMotion}>
            <p className="text-muted flex items-center gap-2.5 text-[0.6875rem] font-medium tracking-[0.22em] uppercase sm:text-xs">
              <span
                aria-hidden="true"
                className="bg-accent size-1.5 shrink-0 rounded-full"
              />
              {EYEBROW}
            </p>
          </HeroReveal>

          <HeroReveal
            className="mt-5 sm:mt-6"
            delay={0.07}
            reduceMotion={reduceMotion}
          >
            <h1
              id="hero-heading"
              className="text-[2.625rem] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-[3.25rem] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.75rem]"
            >
              Digital Products,
              <br />
              Built To Matter.
            </h1>
          </HeroReveal>

          <HeroReveal
            className="mt-5 sm:mt-6"
            delay={0.14}
            reduceMotion={reduceMotion}
          >
            <p className="text-muted max-w-md text-base leading-relaxed text-pretty sm:text-lg">
              {DESCRIPTION}
            </p>
          </HeroReveal>

          <HeroReveal
            className="mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            delay={0.22}
            reduceMotion={reduceMotion}
          >
            <Button href={siteConfig.cta.href}>
              {siteConfig.cta.label}
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                strokeWidth={1.75}
                className="ml-2"
              />
            </Button>
            <Button href={SECONDARY_CTA.href} variant="secondary">
              {SECONDARY_CTA.label}
            </Button>
          </HeroReveal>
        </div>

        <div className="hero-visual-frame pointer-events-none relative z-[1] mt-12 w-full sm:mt-16 lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:h-[26rem] lg:w-[24rem] lg:-translate-y-1/2 xl:h-[30rem] xl:w-[34rem] xl:translate-x-8">
          <HeroVisual reduceMotion={Boolean(reduceMotion)} />
        </div>
      </Container>
    </section>
  );
}

function HeroVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <motion.div
        className="bg-accent/20 absolute top-[18%] left-[22%] h-48 w-48 rounded-full blur-3xl xl:h-56 xl:w-56"
        animate={
          reduceMotion ? { opacity: 0.28 } : { opacity: [0.18, 0.34, 0.18] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 7.5, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div
        className="absolute inset-[6%] opacity-50"
        style={{
          ...GRID_STYLE,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 72% 68% at 58% 42%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 68% at 58% 42%, black, transparent)",
        }}
      />

      <div className="border-border/80 bg-card/40 absolute inset-y-[8%] right-[10%] left-[6%] rounded-lg border">
        <span className="border-foreground/20 absolute top-0 left-0 h-2.5 w-2.5 border-t border-l" />
        <span className="border-foreground/20 absolute top-0 right-0 h-2.5 w-2.5 border-t border-r" />
        <span className="border-foreground/20 absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l" />
        <span className="border-foreground/20 absolute right-0 bottom-0 h-2.5 w-2.5 border-r border-b" />

        <div className="border-border flex h-8 items-center gap-2 border-b px-3">
          <span className="border-border size-2 border" />
          <span className="bg-border h-px w-10" />
          <span className="bg-border ml-auto h-px w-7" />
        </div>

        <div className="grid h-[calc(100%-2rem)] grid-cols-5 grid-rows-5 gap-2.5 p-3 sm:gap-3 sm:p-4">
          <div className="border-border bg-secondary/80 col-span-3 row-span-3 rounded-md border px-3 py-2.5">
            <div className="flex h-full items-end gap-1.5 sm:gap-2">
              {[32, 54, 40, 78, 46, 64, 36, 58].map((height, index) => (
                <span
                  key={height + index}
                  className={
                    index === 3
                      ? "bg-accent/55 w-full rounded-sm"
                      : "bg-foreground/12 w-full rounded-sm"
                  }
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="border-border bg-secondary/80 col-span-2 row-span-3 flex flex-col justify-center gap-2.5 rounded-md border px-3 py-3">
            {[88, 64, 76, 48].map((width) => (
              <span key={width} className="flex items-center gap-2">
                <span className="border-border size-1.5 rounded-[1px] border" />
                <span
                  className="bg-foreground/12 h-px"
                  style={{ width: `${width}%` }}
                />
              </span>
            ))}
          </div>

          <div className="border-border bg-secondary/70 col-span-5 row-span-2 flex items-center gap-2 rounded-md border px-3">
            {[0, 1, 2, 3, 4].map((slot) => (
              <span
                key={slot}
                className={
                  slot === 2
                    ? "border-accent/40 bg-accent/10 h-8 flex-1 rounded-sm border sm:h-10"
                    : "border-border bg-foreground/6 h-8 flex-1 rounded-sm border sm:h-10"
                }
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="border-border bg-card absolute right-[10%] bottom-[10%] w-[42%] rounded-md border p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <span className="flex items-center gap-2">
          <span className="bg-accent size-1 rounded-full" />
          <span className="bg-foreground/15 h-px flex-1" />
        </span>
        <span className="bg-foreground/10 mt-3 block h-px w-[86%]" />
        <span className="bg-foreground/10 mt-2 block h-px w-[62%]" />
        <span className="bg-border mt-3 block h-8 w-full rounded-sm" />
      </motion.div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 560 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M86 318 H210"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          strokeDasharray="5 9"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -28] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 10, repeat: Infinity, ease: "linear" }
          }
        />
        <path
          d="M210 318 H292"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
        <path
          d="M292 318 C 330 318, 348 286, 392 270"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <circle cx="86" cy="318" r="2.5" fill="rgba(255,255,255,0.28)" />
        <circle cx="210" cy="318" r="2.5" fill="rgba(255,255,255,0.22)" />
        <motion.circle
          cx="292"
          cy="318"
          r="3"
          fill="#B7FF3C"
          animate={
            reduceMotion ? { opacity: 0.75 } : { opacity: [0.35, 0.9, 0.35] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <circle cx="392" cy="270" r="2.5" fill="rgba(255,255,255,0.22)" />
      </svg>
    </div>
  );
}
