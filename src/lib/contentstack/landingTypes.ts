export type CSMediaAsset = {
  url: string;
  filename?: string;
  content_type?: string;
};

export type CSMediaVariant = {
  src: CSMediaAsset;
  width: string;
  height: string;
};

export type CSMedia = {
  mobile?: CSMediaVariant;
  tablet?: CSMediaVariant;
  desktop?: CSMediaVariant;
};

export type CSLink = {
  title: string;
  href: string;
};

// Banner
export type CSBannerItem = {
  text?: string;
  alt?: string;
  media?: CSMedia;
  link?: CSLink;
  analytics?: { corporate: string; category: string };
};

export type CSBannerComponent = {
  component_id: string;
  group_id?: string;
  text?: string;
  items: CSBannerItem[];
  style?: string;
};

// Brand carousel
export type CSBrandCarouselItem = {
  icon: CSMediaAsset;
  alt?: string;
  link?: CSLink;
};

export type CSBrandCarouselComponent = {
  component_id: string;
  group_id?: string;
  text?: string;
  link?: CSLink;
  items: CSBrandCarouselItem[];
  style?: string;
  variation?: string;
};

// Nav section
export type CSNavSectionItem = {
  title?: string;
  text?: string;
  alt?: string;
  media?: CSMedia;
  link?: CSLink;
};

export type CSNavSectionComponent = {
  component_id: string;
  group_id?: string;
  title?: string;
  text?: string;
  items: CSNavSectionItem[];
  style?: string;
  variation?: string;
};

// CTA section
export type CSCtaSectionItem = {
  title?: string;
  text?: string;
  link?: CSLink;
  cta?: CSLink;
};

export type CSCtaSectionComponent = {
  component_id: string;
  group_id?: string;
  items: CSCtaSectionItem[];
  style?: string;
  variation?: string;
};

// Steps (testimonials)
export type CSStepsItem = {
  title?: string;
  text?: string;
  link?: CSLink;
  icon?: CSMediaAsset | null;
  image_alt_text?: string;
};

export type CSStepsComponent = {
  component_id: string;
  group_id?: string;
  title?: string;
  text?: string;
  items: CSStepsItem[];
  style?: string;
};

// Content slot (HTML SEO text)
export type CSContentSlotComponent = {
  component_id: string;
  group_id?: string;
  text: string;
  style?: string;
};

// Each element of the component array has exactly one key
export type CSComponent = {
  banner?: CSBannerComponent;
  brand_carousel?: CSBrandCarouselComponent;
  nav_section?: CSNavSectionComponent;
  cta_section?: CSCtaSectionComponent;
  steps?: CSStepsComponent;
  content_slot?: CSContentSlotComponent;
};

// SEO metadata
export type CSLandingSeo = {
  title?: string;
  keyword?: string;
  description?: string;
  schema?: string;
  image?: string;
  canonical?: string;
  robots?: boolean;
};

// Full landing page entry
export type LandingPageData = {
  uid: string;
  title: string;
  page_title?: string;
  seo?: CSLandingSeo;
  component: CSComponent[];
};
