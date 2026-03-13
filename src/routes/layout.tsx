import { useState } from 'react';
import { Outlet, useLoaderData, type LoaderFunction } from '@modern-js/runtime/router';
import type { HeaderBrandData, HeaderSocialIcon } from '../lib/contentstack';
import { fetchHeaderBrandData } from '../lib/contentstack';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { resolveSocialLabel } from '../components/layout/socialUtils';
import { useHeaderBrand } from '../components/layout/useHeaderBrand';
import '../styles/shadcn.css';
import '../styles/global/base.css';
import '../styles/global/seo.css';
import '../styles/layout/header.css';
import '../styles/layout/footer.css';

export const loader: LoaderFunction = async () => {
  return fetchHeaderBrandData();
};

export default function Layout() {
  const loaderData = useLoaderData() as HeaderBrandData | undefined;
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    currentLogo,
    headerSocialIcons,
    footerSocialIcons,
    navigationLinks,
    footerNavigationLinks,
    footerRightsText,
  } = useHeaderBrand(loaderData);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  const socialLabel = (social: HeaderSocialIcon) => resolveSocialLabel(social);

  return (
    <div>
      <SiteHeader
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        onCloseMenu={closeMenu}
        logoUrl={currentLogo.url}
        socialIcons={headerSocialIcons}
        navigationLinks={navigationLinks}
      />

      <Outlet />

      <SiteFooter
        logoUrl={currentLogo.url}
        socialIcons={footerSocialIcons}
        navigationLinks={footerNavigationLinks}
        headerNavigationLinks={navigationLinks}
        footerRightsText={footerRightsText}
        resolveSocialLabel={socialLabel}
      />
    </div>
  );
}
