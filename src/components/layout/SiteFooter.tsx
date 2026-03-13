import type { FooterNavigationLink, HeaderNavigationLink, HeaderSocialIcon } from '../../lib/contentstack';
import { getSocialIconKey } from './socialUtils';

type SiteFooterProps = {
  logoUrl: string;
  socialIcons: HeaderSocialIcon[];
  navigationLinks: FooterNavigationLink[];
  headerNavigationLinks?: HeaderNavigationLink[];
  footerRightsText: string;
  resolveSocialLabel: (social: HeaderSocialIcon) => string;
};

export function SiteFooter({
  logoUrl,
  socialIcons,
  navigationLinks,
  headerNavigationLinks = [],
  footerRightsText,
  resolveSocialLabel,
}: SiteFooterProps) {
  const linksToRender = headerNavigationLinks.length > 0 ? headerNavigationLinks : navigationLinks;
  const footerEntryLinks = navigationLinks;

  return (
    <footer className="fm-footer">
      <div className="fm-footer-row">
        <div className="fm-footer-columns">
          <div className="fm-footer-column">
            <ul className="fm-footer-list">
              {linksToRender.map(link => (
                <li className="fm-footer-item" key={`${link.href}-${link.label}`}>
                  <a className="fm-footer-link" href={link.href} target={link.target || undefined}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="fm-footer-column">
            <ul className="fm-footer-list">
              {footerEntryLinks.map(link => (
                <li className="fm-footer-item" key={`footer-entry-${link.href}-${link.label}`}>
                  <a className="fm-footer-link" href={link.href} target={link.target || undefined}>
                    {link.label}
                  </a>
                </li>
              ))}
              {socialIcons.map((social, index) => (
                <li
                  className="fm-footer-item"
                  key={`social-footer-${getSocialIconKey(social, index)}`}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="fm-footer-link fm-footer-social-link"
                  >
                    <img src={social.url} alt={social.alt} className="fm-footer-social-icon" />
                    {resolveSocialLabel(social)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="fm-footer-column fm-footer-logo-desktop">
            <img src={logoUrl} alt="Logo Fashion Market" className="fm-footer-logo" />
          </div>
        </div>
        <p className="fm-footer-rights">
          {footerRightsText}
        </p>
        <div className="fm-footer-logo-mobile">
          <img src={logoUrl} alt="Logo Fashion Market" className="fm-footer-logo" />
        </div>
      </div>
    </footer>
  );
}
