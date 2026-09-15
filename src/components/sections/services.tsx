import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Layers,
  PanelsTopLeft,
  PencilRuler,
  Server,
  Smartphone,
  Workflow,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/site";

const EYEBROW = "What We Build";
const HEADING = "Software That Solves Real Problems.";
const DESCRIPTION =
  "From customer-facing products to scalable backend systems and AI-powered workflows, we design and build digital solutions around real business needs.";

const serviceIcons = {
  "web-software": Layers,
  "saas-product": PanelsTopLeft,
  "backend-api": Server,
  "ai-automation": Workflow,
  "ui-ux-design": PencilRuler,
  "mobile-apps": Smartphone,
} as const;

const ARCH_GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
} as const;

const cardClassName =
  "border-border bg-card hover:border-foreground/20 group relative overflow-hidden rounded-lg border transition-[border-color,background-color] duration-200 hover:bg-[#1a1a1a] motion-reduce:transition-none";

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

function ServiceIcon({ id, size = 16 }: { id: Service["id"]; size?: number }) {
  const Icon =
    id in serviceIcons ? serviceIcons[id as keyof typeof serviceIcons] : Layers;

  return <Icon aria-hidden="true" size={size} strokeWidth={1.75} />;
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <span className="border-border text-muted group-hover:border-foreground/20 group-hover:text-foreground inline-flex size-9 items-center justify-center rounded-md border transition-[border-color,color,transform] duration-200 motion-safe:group-hover:-translate-y-px motion-reduce:transition-none">
      {children}
    </span>
  );
}

function ServiceIndex({ value }: { value: string }) {
  return (
    <span className="text-muted relative inline-block text-[0.6875rem] font-medium tracking-[0.18em]">
      {value}
      <span
        aria-hidden="true"
        className="bg-accent/0 group-hover:bg-accent/50 absolute top-full left-0 mt-1 h-px w-3.5 transition-colors duration-200"
      />
    </span>
  );
}

function ServiceArrow({ className }: { className?: string }) {
  return (
    <ArrowUpRight
      aria-hidden="true"
      size={16}
      strokeWidth={1.75}
      className={cn(
        "text-muted group-hover:text-foreground self-end transition-[color,transform] duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none",
        className,
      )}
    />
  );
}

function ArchitectureVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative min-h-[11.5rem] overflow-hidden lg:h-full lg:min-h-[15rem]"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          ...ARCH_GRID_STYLE,
          maskImage:
            "radial-gradient(ellipse 78% 72% at 50% 48%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 72% at 50% 48%, black, transparent)",
        }}
      />

      <div className="border-border/80 absolute inset-3 rounded-md border">
        <span className="border-foreground/20 absolute top-0 left-0 h-2 w-2 border-t border-l" />
        <span className="border-foreground/20 absolute top-0 right-0 h-2 w-2 border-t border-r" />
        <span className="border-foreground/20 absolute bottom-0 left-0 h-2 w-2 border-b border-l" />
        <span className="border-foreground/20 absolute right-0 bottom-0 h-2 w-2 border-r border-b" />

        <div className="flex h-full flex-col justify-center gap-0 px-4 py-4 sm:px-5">
          <div className="flex items-center px-1">
            <span className="border-foreground/30 size-1.5 rounded-full border" />
            <span className="bg-foreground/15 mx-2 h-px flex-1" />
            <span className="bg-accent/70 group-hover:bg-accent size-1.5 rounded-full transition-colors duration-200" />
            <span className="bg-foreground/15 mx-2 h-px flex-1" />
            <span className="border-foreground/30 size-1.5 rounded-full border" />
          </div>

          <div className="grid grid-cols-3 px-1">
            <span className="bg-foreground/12 mx-auto h-4 w-px" />
            <span className="bg-foreground/12 mx-auto h-4 w-px" />
            <span className="bg-foreground/12 mx-auto h-4 w-px" />
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <SystemModule lines={[68, 42]} />
            <SystemModule accent lines={[80, 54, 36]} />
            <SystemModule lines={[62, 48]} />
          </div>

          <div className="grid grid-cols-3 px-1">
            <span className="bg-foreground/12 mx-auto h-3 w-px" />
            <span className="bg-foreground/12 mx-auto h-3 w-px" />
            <span className="bg-foreground/12 mx-auto h-3 w-px" />
          </div>
          <span className="bg-foreground/12 mx-4 h-px" />
          <span className="bg-foreground/12 mx-auto h-3 w-px" />

          <div className="border-border bg-secondary/80 flex h-8 items-center gap-1.5 rounded-sm border px-2 sm:h-9">
            {[0, 1, 2, 3, 4].map((slot) => (
              <span
                key={slot}
                className={
                  slot === 2
                    ? "border-accent/30 bg-accent/10 h-3 flex-1 rounded-[2px] border"
                    : "bg-foreground/8 h-3 flex-1 rounded-[2px]"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemModule({
  lines,
  accent = false,
}: {
  lines: number[];
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-secondary/80 rounded-sm border px-2 py-2",
        accent
          ? "border-accent/20 group-hover:border-accent/35 transition-colors duration-200"
          : "border-border",
      )}
    >
      {lines.map((width, index) => (
        <span
          key={`${width}-${index}`}
          className={cn(
            "block h-px",
            index > 0 && "mt-1.5",
            accent && index === 0 ? "bg-accent/35" : "bg-foreground/12",
          )}
          style={{ width: `${width}%` }}
        />
      ))}
    </div>
  );
}

function FeaturedServiceCard({
  service,
  index,
}: {
  service: Service;
  index: string;
}) {
  return (
    <article
      className={cn(
        cardClassName,
        "grid lg:grid-cols-[minmax(0,1fr)_minmax(15rem,40%)]",
      )}
    >
      <span
        aria-hidden="true"
        className="bg-accent/50 absolute top-0 left-6 h-px w-10"
      />

      <div className="flex h-full flex-col p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3">
          <ServiceIndex value={index} />
          <span aria-hidden="true" className="bg-border h-px w-6" />
          <IconFrame>
            <ServiceIcon id={service.id} />
          </IconFrame>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-tight text-balance motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 sm:text-[1.75rem] lg:mt-10 lg:text-3xl">
          {service.title}
        </h3>
        <p className="text-muted mt-3 max-w-md text-sm leading-relaxed text-pretty sm:text-base">
          {service.description}
        </p>
        <ServiceArrow className="mt-8" />
      </div>

      <div className="border-border min-w-0 border-t lg:border-t-0 lg:border-l">
        <ArchitectureVisual />
      </div>
    </article>
  );
}

function ServiceCard({ service, index }: { service: Service; index: string }) {
  return (
    <article
      className={cn(cardClassName, "flex h-full min-h-[17.5rem] flex-col p-6")}
    >
      <div className="flex items-start justify-between gap-4">
        <ServiceIndex value={index} />
        <IconFrame>
          <ServiceIcon id={service.id} />
        </IconFrame>
      </div>

      <h3 className="mt-10 text-lg font-semibold tracking-tight text-balance motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5">
        {service.title}
      </h3>
      <p className="text-muted mt-3 text-sm leading-relaxed text-pretty">
        {service.description}
      </p>
      <ServiceArrow className="mt-auto pt-6" />
    </article>
  );
}

function WideServiceCard({
  service,
  index,
}: {
  service: Service;
  index: string;
}) {
  return (
    <article
      className={cn(
        cardClassName,
        "flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-8 sm:px-7 sm:py-6 lg:gap-10 lg:px-8",
      )}
    >
      <div className="flex shrink-0 items-center gap-4">
        <ServiceIndex value={index} />
        <IconFrame>
          <ServiceIcon id={service.id} />
        </IconFrame>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold tracking-tight text-balance motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5">
          {service.title}
        </h3>
        <p className="text-muted mt-2 max-w-2xl text-sm leading-relaxed text-pretty">
          {service.description}
        </p>
      </div>

      <ServiceArrow className="self-end sm:self-center" />
    </article>
  );
}

export function Services() {
  const [featured, ...rest] = services;
  const supporting = rest.slice(0, -1);
  const closing = rest[rest.length - 1];

  if (!featured || !closing) {
    return null;
  }

  return (
    <Section
      id="services"
      background="secondary"
      aria-labelledby="services-heading"
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

          <Reveal className="mt-4" delay={0.06}>
            <h2
              id="services-heading"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              {HEADING}
            </h2>
          </Reveal>

          <Reveal className="mt-4" delay={0.12}>
            <p className="text-muted text-base leading-relaxed text-pretty sm:text-lg">
              {DESCRIPTION}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:mt-14 lg:mt-16 lg:gap-5">
          <Reveal delay={0.18}>
            <FeaturedServiceCard service={featured} index={formatIndex(1)} />
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-2 lg:gap-5" delay={0.26}>
            {supporting.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={formatIndex(index + 2)}
              />
            ))}
            <div className="sm:col-span-2">
              <WideServiceCard service={closing} index={formatIndex(6)} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
