import type { Service, SiteConfig } from "@/types/site";

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
