import { Button } from '../ui/button';
import type { CSCtaSectionComponent } from '../../lib/contentstack/landingTypes';
import { hasUsableHref } from './optionalLink';

type CtaSectionProps = {
  data: CSCtaSectionComponent;
};

export function CtaSection({ data }: CtaSectionProps) {
  if (!data.items?.length) return null;

  const item = data.items[0];
  const link = item.link;
  const ctaText = link?.title || item.title || '';

  if (!ctaText) return null;

  if (!hasUsableHref(link?.href)) {
    return (
      <div className="fm-cta-wrapper m-10">
        <span
          className="fm-home-cta-button inline-flex h-auto rounded-[15px] bg-[var(--fm-dark)] px-[15px] py-[15px] text-[12px] font-bold text-[var(--fm-white)]"
          aria-disabled="true"
        >
          {ctaText}
        </span>
      </div>
    );
  }

  return (
    <div className="fm-cta-wrapper m-10">
      <Button
        asChild
        className="fm-home-cta-button h-auto rounded-[15px] bg-[var(--fm-dark)] px-[15px] py-[15px] text-[12px] font-bold text-[var(--fm-white)] no-underline hover:bg-[#62646b]"
        variant="default"
        size="default"
      >
        <a href={link?.href}>{ctaText}</a>
      </Button>
    </div>
  );
}
