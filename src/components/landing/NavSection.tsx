import type { CSNavSectionComponent } from '../../lib/contentstack/landingTypes';
import { renderHighlightedText } from './highlightText';
import { OptionalLink } from './optionalLink';

type NavSectionProps = {
  data: CSNavSectionComponent;
};

// Máximo 4 columnas; 2 ítems → ropa2, cualquier otro → ropa1
function resolveGridClass(itemCount: number): string {
  return itemCount === 2
    ? 'fm-nav-grid-two mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-5'
    : 'fm-nav-grid-three grid grid-cols-1 md:grid-cols-3 md:gap-5';
}

export function NavSection({ data }: NavSectionProps) {
  if (!data.items?.length) return null;

  const gridClass = resolveGridClass(data.items.length);

  return (
    <>
      {data.title && (
        <div className="fm-section-heading">
          <h2 className="mb-[10px] mt-10 text-[32px] font-bold">
            <strong>{renderHighlightedText(data.title)}</strong>
          </h2>
        </div>
      )}
      <div className={gridClass}>
        {data.items.map((item, i) => {
          const mobileSrc = item.media?.mobile?.src?.url;
          const desktopSrc = item.media?.desktop?.src?.url || item.media?.tablet?.src?.url;
          const alt = item.alt || item.title || '';

          return (
            <div key={`nav-item-${i}`} className="fm-nav-item">
              <OptionalLink
                href={item.link?.href}
                title={item.link?.title || item.title || alt}
                className="fm-optional-link"
              >
                <picture>
                  {desktopSrc && <source media="(min-width: 768px)" srcSet={desktopSrc} />}
                  <img src={mobileSrc || desktopSrc || ''} alt={alt} />
                </picture>
                {item.title && (
                  <div className="fm-nav-item-title bg-[var(--fm-orange)] p-[5px] text-[21px] font-bold text-[var(--fm-white)]">
                    <span>{item.title}</span>
                  </div>
                )}
              </OptionalLink>
            </div>
          );
        })}
      </div>
    </>
  );
}
