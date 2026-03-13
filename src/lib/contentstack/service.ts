import {
  CONTENTSTACK_FOOTER_CONTENT_TYPE_UID,
  CONTENTSTACK_FOOTER_ENTRY_UID,
  CONTENTSTACK_LANDING_CONTENT_TYPE_UID,
  CONTENTSTACK_LANDING_ENTRY_UID,
  CONTENTSTACK_LOGO_FIELD_UID,
  DEFAULT_LOGO_URL,
} from './config';
import { fetchEntryFromDeliveryApi } from './api';
import type { LandingPageData } from './landingTypes';
import {
  resolveFooterNavigationLinksFromEntry,
  resolveFooterRightsTextFromEntry,
  resolveLogoFromEntry,
  resolveNavigationLinksFromEntry,
  resolveSocialIconsFromEntry,
} from './parsers';
import type {
  FooterNavigationLink,
  HeaderBrandData,
  HeaderNavigationLink,
  HeaderLogoVariants,
  HeaderSocialIcon,
} from './types';

const DEFAULT_LOGO: HeaderLogoVariants = {
  fallback: { url: DEFAULT_LOGO_URL },
};
const DEFAULT_FOOTER_RIGHTS_TEXT = '2025 © FashionMarket todos los derechos reservados';

export const fetchHeaderBrandData = async (): Promise<HeaderBrandData> => {
  try {
    const entry = await fetchEntryFromDeliveryApi();
    const footerEntry = await fetchEntryFromDeliveryApi({
      contentTypeUid: CONTENTSTACK_FOOTER_CONTENT_TYPE_UID,
      entryUid: CONTENTSTACK_FOOTER_ENTRY_UID,
    });

    if (!entry) {
      const fallbackFooterNavigationLinks = footerEntry
        ? resolveFooterNavigationLinksFromEntry(footerEntry)
        : [];
      const fallbackFooterRightsText = footerEntry
        ? resolveFooterRightsTextFromEntry(footerEntry)
        : '';

      return {
        logo: DEFAULT_LOGO,
        socialIcons: [],
        navigationLinks: [],
        footerNavigationLinks: fallbackFooterNavigationLinks,
        footerRightsText: fallbackFooterRightsText || DEFAULT_FOOTER_RIGHTS_TEXT,
      };
    }

    const logo = resolveLogoFromEntry(entry, CONTENTSTACK_LOGO_FIELD_UID);
    const socialIcons = resolveSocialIconsFromEntry(entry);
    const navigationLinks = resolveNavigationLinksFromEntry(entry);
    const footerSourceEntry = footerEntry || entry;
    const footerNavigationLinks = resolveFooterNavigationLinksFromEntry(footerSourceEntry);
    const footerRightsText =
      resolveFooterRightsTextFromEntry(footerSourceEntry) || DEFAULT_FOOTER_RIGHTS_TEXT;

    return {
      logo: logo || DEFAULT_LOGO,
      socialIcons,
      navigationLinks,
      footerNavigationLinks,
      footerRightsText,
    };
  } catch (error) {
    console.warn('No fue posible obtener datos de marca desde Contentstack', error);
    return {
      logo: DEFAULT_LOGO,
      socialIcons: [],
      navigationLinks: [],
      footerNavigationLinks: [],
      footerRightsText: DEFAULT_FOOTER_RIGHTS_TEXT,
    };
  }
};

export const fetchLandingPageData = async (): Promise<LandingPageData | null> => {
  try {
    const entry = await fetchEntryFromDeliveryApi({
      contentTypeUid: CONTENTSTACK_LANDING_CONTENT_TYPE_UID,
      entryUid: CONTENTSTACK_LANDING_ENTRY_UID,
    });
    if (!entry) return null;
    return entry as unknown as LandingPageData;
  } catch (error) {
    console.warn('No fue posible obtener datos de la landing page desde Contentstack', error);
    return null;
  }
};

export type { HeaderSocialIcon };
export type { HeaderNavigationLink };
export type { FooterNavigationLink };
