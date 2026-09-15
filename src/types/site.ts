export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
};

export type Principle = {
  id: string;
  title: string;
  description: string;
};

export type ShowcaseProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type TechnologyGroup = {
  id: string;
  category: string;
  technologies: string[];
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  navigation: NavItem[];
  cta: NavItem;
};
