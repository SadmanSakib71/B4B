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

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  navigation: NavItem[];
  cta: NavItem;
};
