export type NavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  navigation: NavItem[];
  cta: NavItem;
};
