import type { HeaderSocialIcon } from '../../lib/contentstack';

export const getSocialIconKey = (social: HeaderSocialIcon, index: number): string => {
  return `${social.href}|${social.url}|${social.alt}|${index}`;
};

export const resolveSocialLabel = (social: HeaderSocialIcon): string => {
  if (social.label) {
    return social.label;
  }

  if (social.href.includes('instagram.com')) {
    return '@FashionMarketOutlet';
  }

  if (social.href.includes('facebook.com')) {
    return '@FashionMarketOutlet';
  }

  return social.href;
};
