import type { SiteConfig } from "@/types/site";

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
