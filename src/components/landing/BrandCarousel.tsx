import type { CSBrandCarouselComponent } from '../../lib/contentstack/landingTypes';
import { OptionalLink } from './optionalLink';

type BrandCarouselProps = {
  data: CSBrandCarouselComponent;
};

export function BrandCarousel({ data }: BrandCarouselProps) {
  if (!data.items?.length) return null;

  return (
    <div className="fm-brand-strip mx-auto max-w-[1170px] bg-[var(--fm-dark)] p-px text-center">
      {data.text && (
        <h2 className="pt-3 text-2xl text-[var(--fm-white)] md:pt-4">
          <strong>{data.text}</strong>
        </h2>
      )}
      <div
        id="fm-brand-track"
        className="mt-5 flex items-center gap-3 overflow-x-auto md:justify-center md:gap-4 [-webkit-overflow-scrolling:touch]"
      >
        {data.items.map((item, i) => (
          <div
            key={`brand-${i}`}
            className="fm-brand-item mb-3 flex h-[60px] w-[60px] shrink-0 items-center justify-center md:w-[75px] lg:w-[100px]"
          >
            <OptionalLink
              href={item.link?.href}
              title={item.link?.title || item.alt}
              className="fm-optional-link"
            >
              <img
                src={item.icon?.url}
                alt={item.alt || ''}
                className="mx-[15px] w-[60px] md:w-[70px] lg:w-[80px]"
              />
            </OptionalLink>
          </div>
        ))}
      </div>
    </div>
  );
}
