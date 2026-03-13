import { useEffect, useMemo, useState } from 'react';
import {
  type HeaderBrandData,
  fetchHeaderBrandData,
  type HeaderLogoData,
  type HeaderLogoVariants,
} from '../../lib/contentstack';

const DEFAULT_LOGO: HeaderLogoVariants = {
  fallback: { url: 'img/Logo.png' },
};

const DEFAULT_SOCIAL_ICONS = [
  {
    url: 'img/facebook.png',
    href: 'https://www.facebook.com/FashionMarketOutlet',
    alt: 'Icono Facebook.',
    label: '@FashionMarketOutlet',
  },
  {
    url: 'img/instagram.png',
    href: 'https://www.instagram.com/fashionmarketoutlet/',
    alt: 'Icono Instagram.',
    label: '@FashionMarketOutlet',
  },
];
const DEFAULT_FOOTER_RIGHTS_TEXT = '2025 © FashionMarket todos los derechos reservados';

const normalizeBrandData = (data?: HeaderBrandData): HeaderBrandData => {
  if (!data) {
    return {
      logo: DEFAULT_LOGO,
      socialIcons: DEFAULT_SOCIAL_ICONS,
      navigationLinks: [],
      footerNavigationLinks: [],
      footerRightsText: DEFAULT_FOOTER_RIGHTS_TEXT,
    };
  }

  return {
    logo: data.logo || DEFAULT_LOGO,
    socialIcons: data.socialIcons.length > 0 ? data.socialIcons : DEFAULT_SOCIAL_ICONS,
    navigationLinks: data.navigationLinks,
    footerNavigationLinks: data.footerNavigationLinks,
    footerRightsText: data.footerRightsText || DEFAULT_FOOTER_RIGHTS_TEXT,
  };
};

const pickLogoByViewport = (
  logo: HeaderLogoVariants,
  viewportWidth: number | null,
): HeaderLogoData => {
  const fallback = logo.fallback || logo.desktop || logo.tablet || logo.mobile;

  if (viewportWidth === null) {
    return fallback || { url: 'img/Logo.png' };
  }

  if (viewportWidth < 768) {
    return logo.mobile || logo.tablet || logo.desktop || fallback || { url: 'img/Logo.png' };
  }

  if (viewportWidth < 1024) {
    return logo.tablet || logo.desktop || logo.mobile || fallback || { url: 'img/Logo.png' };
  }

  return logo.desktop || logo.tablet || logo.mobile || fallback || { url: 'img/Logo.png' };
};

export const useHeaderBrand = (initialData?: HeaderBrandData) => {
  const normalizedInitialData = useMemo(() => normalizeBrandData(initialData), [initialData]);
  const [brandData, setBrandData] = useState<HeaderBrandData>(normalizedInitialData);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

  useEffect(() => {
    setBrandData(normalizedInitialData);
  }, [normalizedInitialData]);

  useEffect(() => {
    if (initialData) {
      return;
    }

    let active = true;

    fetchHeaderBrandData().then(data => {
      if (!active) {
        return;
      }

      setBrandData(normalizeBrandData(data));
    });

    return () => {
      active = false;
    };
  }, [initialData]);

  useEffect(() => {
    const updateWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const currentLogo = useMemo(
    () => pickLogoByViewport(brandData.logo, viewportWidth),
    [brandData.logo, viewportWidth],
  );
  const headerSocialIcons = useMemo(
    () => brandData.socialIcons.map(social => ({ ...social, label: undefined })),
    [brandData.socialIcons],
  );
  const footerSocialIcons = useMemo(
    () => brandData.socialIcons,
    [brandData.socialIcons],
  );

  return {
    currentLogo,
    headerSocialIcons,
    footerSocialIcons,
    navigationLinks: brandData.navigationLinks,
    footerNavigationLinks: brandData.footerNavigationLinks,
    footerRightsText: brandData.footerRightsText,
  };
};
