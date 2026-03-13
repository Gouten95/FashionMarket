import type { CSBannerComponent } from '../../lib/contentstack/landingTypes';
import { OptionalLink } from './optionalLink';

type BannerProps = {
  data: CSBannerComponent;
};

export function Banner({ data }: BannerProps) {
  if (!data.items?.length) return null;

  const item = data.items[0];

  // Orange text banner: item has text but no meaningful image
  if (item.text) {
    return (
      <div className="mb-5">
        <OptionalLink
          href={item.link?.href}
          title={item.link?.title || item.text}
          className="fm-optional-link"
        >
          <div className="flex h-[170px] items-center justify-center bg-[var(--fm-orange)] text-[var(--fm-white)]">
            <h2 className="m-0 text-[32px] md:text-[50px]">{item.text}</h2>
          </div>
        </OptionalLink>
      </div>
    );
  }

  // Image banner
  const mobileSrc = item.media?.mobile?.src?.url;
  const desktopSrc = item.media?.desktop?.src?.url || item.media?.tablet?.src?.url;
  const alt = item.alt || '';

  if (!mobileSrc && !desktopSrc) return null;

  return (
    <div id="fm-hero-banner" className="w-full pt-0">
      <OptionalLink href={item.link?.href} title={item.link?.title || alt} className="fm-optional-link">
        <picture>
          {desktopSrc && <source media="(min-width: 768px)" srcSet={desktopSrc} />}
          <img src={mobileSrc || desktopSrc || ''} alt={alt} />
        </picture>
      </OptionalLink>
    </div>
  );
}
