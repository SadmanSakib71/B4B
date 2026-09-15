import type { Principle, Service, SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "B4B",
  tagline: "Built For Bangladesh",
  description:
    "Digital products, software solutions, and technology built for ambitious businesses.",
  navigation: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ],
  cta: {
    label: "Start a Project",
    href: "/contact",
  },
};

export const services: Service[] = [
  {
    id: "web-software",
    title: "Web & Software Development",
    description:
      "High-performance web applications and business software built for real-world use, scalability, and long-term maintainability.",
  },
  {
    id: "saas-product",
    title: "SaaS & Product Development",
    description:
      "From early product ideas to production-ready SaaS platforms, we build the architecture, interfaces, and workflows needed to grow.",
  },
  {
    id: "backend-api",
    title: "Backend & API Engineering",
    description:
      "Reliable APIs, business logic, database architecture, authentication, integrations, and backend systems designed to support modern products.",
  },
  {
    id: "ai-automation",
    title: "AI Solutions & Automation",
    description:
      "AI-powered features, intelligent workflows, chatbots, and automation that help businesses reduce manual work and build better experiences.",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX & Product Design",
    description:
      "Clear, thoughtful interfaces and product experiences designed around usability, business goals, and real users.",
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description:
      "Modern mobile experiences that extend digital products beyond the browser and connect users wherever they are.",
  },
];

export const principles: Principle[] = [
  {
    id: "product-first",
    title: "Product First",
    description:
      "We focus on the problem behind the request, not just the feature itself. That helps us build products that are useful, clear, and aligned with real business needs.",
  },
  {
    id: "engineering-that-scales",
    title: "Engineering That Scales",
    description:
      "We build with maintainability in mind — from clean architecture and reliable APIs to database design, performance, and future growth.",
  },
  {
    id: "ai-native-workflow",
    title: "AI-Native Workflow",
    description:
      "We use modern AI-assisted development tools to accelerate research, implementation, debugging, testing, and iteration while keeping engineering judgment at the center.",
  },
  {
    id: "built-for-the-long-run",
    title: "Built For The Long Run",
    description:
      "We aim for codebases and systems that other developers can understand, extend, and maintain as the product evolves.",
  },
];
