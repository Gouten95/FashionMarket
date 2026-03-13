export type HeaderLogoData = {
  url: string;
};

export type HeaderLogoVariants = {
  mobile?: HeaderLogoData;
  tablet?: HeaderLogoData;
  desktop?: HeaderLogoData;
  fallback?: HeaderLogoData;
};

export type HeaderSocialIcon = {
  url: string;
  href: string;
  alt: string;
  label?: string;
};

export type HeaderNavigationLink = {
  label: string;
  href: string;
  target: string;
  iconUrl?: string;
};

export type FooterNavigationLink = {
  label: string;
  href: string;
  target: string;
  iconUrl?: string;
};

export type HeaderBrandData = {
  logo: HeaderLogoVariants;
  socialIcons: HeaderSocialIcon[];
  navigationLinks: HeaderNavigationLink[];
  footerNavigationLinks: FooterNavigationLink[];
  footerRightsText: string;
};

export type ContentstackEntry = Record<string, unknown>;
