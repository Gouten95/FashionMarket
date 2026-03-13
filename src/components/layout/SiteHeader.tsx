import type { HeaderNavigationLink, HeaderSocialIcon } from '../../lib/contentstack';
import { getSocialIconKey } from './socialUtils';

type SiteHeaderProps = {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  logoUrl: string;
  socialIcons: HeaderSocialIcon[];
  navigationLinks: HeaderNavigationLink[];
};

export function SiteHeader({
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  logoUrl,
  socialIcons,
  navigationLinks,
}: SiteHeaderProps) {
  return (
    <header className="fm-header">
      <div className="fm-header-menu">
        <div className="fm-icon-logo">
          <span id="menu-open" className="fm-menu-open" onClick={onToggleMenu}>
            <i className="fa fa-bars" aria-hidden="true" />
          </span>
          <a href="/" className="fm-logo-link">
            <img src={logoUrl} alt="Logo Fashion Market" className="fm-logo" />
          </a>
          <div className="fm-social-mobile-wrap">
            <ul className="fm-social-mobile-list">
              {socialIcons.map((social, index) => (
                <li
                  key={`social-mobile-${getSocialIconKey(social, index)}`}
                  className="fm-social-mobile-item fm-social-item-spacing"
                >
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <img src={social.url} alt={social.alt} className="fm-social-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`fm-menu-hidden${menuOpen ? ' show' : ''}`}>
          <ul className="fm-nav-list">
            {navigationLinks.map(link => (
              <li
                key={`nav-${link.label}-${link.href}`}
                className="fm-nav-item"
              >
                <a href={link.href} target={link.target || undefined} className="fm-nav-link">
                  {link.iconUrl && (
                    <img src={link.iconUrl} alt="" aria-hidden="true" className="fm-nav-icon" />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
            {socialIcons.map((social, index) => (
              <li
                key={`social-desktop-${getSocialIconKey(social, index)}`}
                className="fm-social-desktop-item fm-social-item-spacing"
              >
                <a href={social.href} target="_blank" rel="noreferrer" className="fm-social-desktop-link">
                  <img src={social.url} alt={social.alt} className="fm-social-icon" />
                </a>
              </li>
            ))}
          </ul>
          <span id="menu-close" className="fm-menu-close" onClick={onCloseMenu}>
            <i className="fa fa-times-circle" aria-hidden="true" />
          </span>
        </div>

        <div className={`fm-overlay${menuOpen ? ' show' : ''}`} onClick={onCloseMenu} />
      </div>
    </header>
  );
}
