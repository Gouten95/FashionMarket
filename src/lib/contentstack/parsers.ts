import type {
  ContentstackEntry,
  FooterNavigationLink,
  HeaderNavigationLink,
  HeaderLogoData,
  HeaderLogoVariants,
  HeaderSocialIcon,
} from './types';

const FIELD_UIDS = {
  media: 'media',
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
  src: 'src',
} as const;

const SOCIAL_COMPONENT_ID = 'logosRedesSociales';
const NAVIGATION_COMPONENT_PREFIX = 'navigation-';
const FOOTER_NAVIGATION_COMPONENT_PREFIX = 'navigationfooter-';
const FOOTER_RIGHTS_COMPONENT_ID = 'footerderechosreservados';
const FOOTER_NAVIGATION_COMPONENT_HINTS = [
  FOOTER_NAVIGATION_COMPONENT_PREFIX,
  'navigationfooter',
  'navigation-footer',
  'footer-navigation',
  'footernavigation',
  'navigation_footer',
  'footer_navigation',
];

const isNavigationComponent = (componentId: unknown): boolean => {
  if (typeof componentId !== 'string') {
    return false;
  }

  const normalized = componentId.trim().toLowerCase();

  return normalized.startsWith(NAVIGATION_COMPONENT_PREFIX);
};

const isFooterNavigationComponent = (componentId: unknown): boolean => {
  if (typeof componentId !== 'string') {
    return false;
  }

  const normalized = componentId.trim().toLowerCase();

  return FOOTER_NAVIGATION_COMPONENT_HINTS.some(hint => normalized.includes(hint));
};

const isFooterRightsComponent = (componentId: unknown): boolean => {
  if (typeof componentId !== 'string') {
    return false;
  }

  return componentId.trim().toLowerCase() === FOOTER_RIGHTS_COMPONENT_ID;
};

const normalizeRichTextToPlain = (value: string): string => {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
};

const normalizeAssetUrl = (url?: string): string | null => {
  if (!url) {
    return null;
  }

  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  return url;
};

const extractAssetUrl = (value: unknown): string | null => {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    const first = value[0] as { url?: string } | undefined;
    return normalizeAssetUrl(first?.url);
  }

  const objectValue = value as Record<string, unknown>;

  if (typeof objectValue.url === 'string') {
    return normalizeAssetUrl(objectValue.url);
  }

  return null;
};

const extractAssetData = (value: unknown): HeaderLogoData | null => {
  const url = extractAssetUrl(value);

  if (!url) {
    return null;
  }

  return { url };
};

const resolveDeviceLogoData = (device: unknown): HeaderLogoData | null => {
  const deviceValue = device as Record<string, unknown> | undefined;

  if (!deviceValue) {
    return null;
  }

  const imageData = extractAssetData(deviceValue[FIELD_UIDS.src]);

  if (!imageData) {
    return null;
  }

  return { url: imageData.url };
};

const hasVariant = (variants?: HeaderLogoVariants | null): variants is HeaderLogoVariants => {
  return Boolean(
    variants &&
      (variants.mobile || variants.tablet || variants.desktop || variants.fallback),
  );
};

const resolveComponentPayloads = (entry: ContentstackEntry): Array<Record<string, unknown>> => {
  const blocks = entry.component;

  if (!Array.isArray(blocks)) {
    return [];
  }

  const payloads: Array<Record<string, unknown>> = [];

  for (const block of blocks) {
    if (!block || typeof block !== 'object') {
      continue;
    }

    const blockObject = block as Record<string, unknown>;

    for (const value of Object.values(blockObject)) {
      if (value && typeof value === 'object') {
        payloads.push(value as Record<string, unknown>);
      }
    }
  }

  return payloads;
};

const resolveResponsiveLogoUrl = (value: unknown): string | null => {
  const media = value as Record<string, unknown> | undefined;

  if (!media || typeof media !== 'object') {
    return null;
  }

  const desktop = media[FIELD_UIDS.desktop] as Record<string, unknown> | undefined;
  const tablet = media[FIELD_UIDS.tablet] as Record<string, unknown> | undefined;
  const mobile = media[FIELD_UIDS.mobile] as Record<string, unknown> | undefined;

  return (
    extractAssetUrl(desktop?.[FIELD_UIDS.src]) ||
    extractAssetUrl(tablet?.[FIELD_UIDS.src]) ||
    extractAssetUrl(mobile?.[FIELD_UIDS.src])
  );
};

const resolveResponsiveLogoData = (value: unknown): HeaderLogoData | null => {
  const media = value as Record<string, unknown> | undefined;

  if (!media || typeof media !== 'object') {
    return null;
  }

  return (
    resolveDeviceLogoData(media.desktop) ||
    resolveDeviceLogoData(media.tablet) ||
    resolveDeviceLogoData(media.mobile)
  );
};

const resolveResponsiveLogoVariants = (value: unknown): HeaderLogoVariants | null => {
  const media = value as Record<string, unknown> | undefined;

  if (!media || typeof media !== 'object') {
    return null;
  }

  const variants: HeaderLogoVariants = {
    mobile: resolveDeviceLogoData(media[FIELD_UIDS.mobile]) ?? undefined,
    tablet: resolveDeviceLogoData(media[FIELD_UIDS.tablet]) ?? undefined,
    desktop: resolveDeviceLogoData(media[FIELD_UIDS.desktop]) ?? undefined,
  };

  return hasVariant(variants) ? variants : null;
};

const resolveFirstLogoData = (value: unknown): HeaderLogoData | null => {
  return resolveResponsiveLogoData(value) || extractAssetData(value);
};

const resolveLogoFromComponentBlocks = (entry: ContentstackEntry): HeaderLogoVariants | null => {
  const payloads = resolveComponentPayloads(entry);

  for (const payload of payloads) {
    const items = payload.items;

    if (!Array.isArray(items)) {
      continue;
    }

    for (const item of items) {
      const itemObject = item as Record<string, unknown> | null;
      const mediaValue = itemObject?.[FIELD_UIDS.media];

      const variants = resolveResponsiveLogoVariants(mediaValue);

      if (hasVariant(variants)) {
        return {
          ...variants,
          fallback: variants.desktop || variants.tablet || variants.mobile,
        };
      }

      const firstLogoData = resolveFirstLogoData(mediaValue);

      if (firstLogoData) {
        return { fallback: firstLogoData };
      }
    }
  }

  return null;
};

const resolveSocialIconFromItem = (item: Record<string, unknown>): HeaderSocialIcon | null => {
  const mediaValue = item[FIELD_UIDS.media];
  const mediaData = resolveFirstLogoData(mediaValue);

  if (!mediaData) {
    return null;
  }

  const link = item.link as Record<string, unknown> | undefined;
  const rawHref = typeof link?.href === 'string' ? link.href.trim() : '';
  const href = rawHref || '#';

  const label =
    typeof link?.title === 'string' && link.title.trim()
      ? link.title.trim()
      : typeof item.text === 'string' && item.text.trim()
        ? item.text.trim()
        : undefined;

  return {
    url: mediaData.url,
    href,
    alt:
      typeof item.alt === 'string' && item.alt.trim()
        ? item.alt.trim()
        : 'Icono red social',
    label,
  };
};

export const resolveSocialIconsFromEntry = (entry: ContentstackEntry): HeaderSocialIcon[] => {
  const payloads = resolveComponentPayloads(entry);
  const preferredPayloads = payloads.filter(
    payload => payload.component_id === SOCIAL_COMPONENT_ID,
  );
  const sourcePayloads = preferredPayloads.length > 0 ? preferredPayloads : payloads;

  const socialIcons: HeaderSocialIcon[] = [];

  for (const payload of sourcePayloads) {
    const items = payload.items;

    if (!Array.isArray(items)) {
      continue;
    }

    for (const item of items) {
      if (!item || typeof item !== 'object') {
        continue;
      }

      const social = resolveSocialIconFromItem(item as Record<string, unknown>);

      if (social) {
        socialIcons.push(social);
      }
    }
  }

  return socialIcons;
};

const resolveNavigationLinkFromItem = (
  item: Record<string, unknown>,
): HeaderNavigationLink | null => {
  const link = item.link as Record<string, unknown> | undefined;

  const label = typeof link?.title === 'string' ? link.title.trim() : '';
  if (!label) {
    return null;
  }

  const href =
    typeof link?.href === 'string' && link.href.trim() ? link.href.trim() : '#';
  const target =
    typeof item.target === 'string' && item.target.trim() ? item.target.trim() : '';
  const icon = extractAssetData(item.icon);

  return {
    label,
    href,
    target,
    iconUrl: icon?.url,
  };
};

const resolveFooterNavigationLinkFromItem = (
  item: Record<string, unknown>,
): FooterNavigationLink | null => {
  const link = item.link as Record<string, unknown> | undefined;

  const label = typeof link?.title === 'string' ? link.title.trim() : '';
  if (!label) {
    return null;
  }

  const href =
    typeof link?.href === 'string' && link.href.trim() ? link.href.trim() : '#';
  const target =
    typeof item.target === 'string' && item.target.trim() ? item.target.trim() : '';
  const icon = extractAssetData(item.icon);

  return {
    label,
    href,
    target,
    iconUrl: icon?.url,
  };
};

export const resolveNavigationLinksFromEntry = (
  entry: ContentstackEntry,
): HeaderNavigationLink[] => {
  const payloads = resolveComponentPayloads(entry);
  const navigationPayloads = payloads.filter(
    payload => isNavigationComponent(payload.component_id),
  );

  const links: HeaderNavigationLink[] = [];

  for (const payload of navigationPayloads) {
    const directLink = resolveNavigationLinkFromItem(payload);

    if (directLink) {
      links.push(directLink);
    }

    const items = payload.items;

    if (!Array.isArray(items)) {
      continue;
    }

    for (const item of items) {
      if (!item || typeof item !== 'object') {
        continue;
      }

      const link = resolveNavigationLinkFromItem(item as Record<string, unknown>);
      if (link) {
        links.push(link);
      }
    }
  }

  return links;
};

export const resolveFooterNavigationLinksFromEntry = (
  entry: ContentstackEntry,
): FooterNavigationLink[] => {
  const payloads = resolveComponentPayloads(entry);
  let footerNavigationPayloads = payloads.filter(
    payload => isFooterNavigationComponent(payload.component_id),
  );

  if (footerNavigationPayloads.length === 0) {
    footerNavigationPayloads = payloads.filter(payload => {
      const componentId = payload.component_id;

      if (typeof componentId !== 'string') {
        return false;
      }

      const normalized = componentId.trim().toLowerCase();

      return (
        normalized.includes('footer') &&
        !isFooterRightsComponent(componentId) &&
        normalized !== SOCIAL_COMPONENT_ID.toLowerCase()
      );
    });
  }

  const links: FooterNavigationLink[] = [];

  for (const payload of footerNavigationPayloads) {
    const directLink = resolveFooterNavigationLinkFromItem(payload);

    if (directLink) {
      links.push(directLink);
    }

    const items = payload.items;

    if (!Array.isArray(items)) {
      continue;
    }

    for (const item of items) {
      if (!item || typeof item !== 'object') {
        continue;
      }

      const link = resolveFooterNavigationLinkFromItem(item as Record<string, unknown>);
      if (link) {
        links.push(link);
      }
    }
  }

  return links;
};

export const resolveFooterRightsTextFromEntry = (entry: ContentstackEntry): string => {
  const payloads = resolveComponentPayloads(entry);
  const footerRightsPayload = payloads.find(payload =>
    isFooterRightsComponent(payload.component_id),
  );

  if (!footerRightsPayload) {
    return '';
  }

  const directText =
    typeof footerRightsPayload.text === 'string' ? footerRightsPayload.text.trim() : '';
  const normalizedDirectText = directText ? normalizeRichTextToPlain(directText) : '';

  if (normalizedDirectText) {
    return normalizedDirectText;
  }

  const items = footerRightsPayload.items;

  if (!Array.isArray(items)) {
    return '';
  }

  for (const item of items) {
    if (!item || typeof item !== 'object') {
      continue;
    }

    const itemText = typeof (item as Record<string, unknown>).text === 'string'
      ? ((item as Record<string, unknown>).text as string).trim()
      : '';
    const normalizedItemText = itemText ? normalizeRichTextToPlain(itemText) : '';

    if (normalizedItemText) {
      return normalizedItemText;
    }
  }

  return '';
};

export const resolveLogoFromEntry = (
  entry: ContentstackEntry,
  logoFieldUid: string,
): HeaderLogoVariants | null => {
  const logoFromBlocks = resolveLogoFromComponentBlocks(entry);

  if (hasVariant(logoFromBlocks)) {
    return logoFromBlocks;
  }

  const value = entry[logoFieldUid];

  const variantsFromField = resolveResponsiveLogoVariants(value);

  if (hasVariant(variantsFromField)) {
    return {
      ...variantsFromField,
      fallback:
        variantsFromField.desktop ||
        variantsFromField.tablet ||
        variantsFromField.mobile,
    };
  }

  const responsiveData = resolveFirstLogoData(value);

  if (responsiveData) {
    return { fallback: responsiveData };
  }

  const responsiveUrl = resolveResponsiveLogoUrl(value);

  if (responsiveUrl) {
    return { fallback: { url: responsiveUrl } };
  }

  const fallbackVariants = resolveResponsiveLogoVariants(entry[FIELD_UIDS.media]);

  if (hasVariant(fallbackVariants)) {
    return {
      ...fallbackVariants,
      fallback:
        fallbackVariants.desktop ||
        fallbackVariants.tablet ||
        fallbackVariants.mobile,
    };
  }

  const fallbackResponsiveData = resolveFirstLogoData(entry[FIELD_UIDS.media]);

  if (fallbackResponsiveData) {
    return { fallback: fallbackResponsiveData };
  }

  const fallbackResponsiveUrl = resolveResponsiveLogoUrl(entry[FIELD_UIDS.media]);

  if (fallbackResponsiveUrl) {
    return { fallback: { url: fallbackResponsiveUrl } };
  }

  const headerLogo = resolveFirstLogoData(entry.header_logo);

  if (headerLogo) {
    return { fallback: headerLogo };
  }

  return null;
};
