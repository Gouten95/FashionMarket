import type { CSStepsComponent } from '../../lib/contentstack/landingTypes';
import { renderHighlightedText } from './highlightText';
import { OptionalLink } from './optionalLink';

type StepsProps = {
  data: CSStepsComponent;
};

export function Steps({ data }: StepsProps) {
  if (!data.items?.length) return null;

  return (
    <>
      {data.title && (
        <div className="fm-section-heading">
          <h2 className="mb-[10px] mt-10 text-[32px] font-bold">
            <strong>{renderHighlightedText(data.title)}</strong>
          </h2>
        </div>
      )}
      <div className="fm-testimonials flex justify-center">
        <div
          id="fm-testimonials-track"
          className="fm-testimonials-track flex w-full items-stretch gap-4 overflow-x-auto px-4 pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0"
        >
          {data.items.map((item, i) => (
            <div
              key={`step-${i}`}
              className="fm-testimonial-card my-5 min-w-[85%] bg-[var(--fm-white)] px-8 py-[60px] text-[18px] font-bold md:min-w-0 md:px-10"
            >
              <OptionalLink
                href={item.link?.href}
                title={item.link?.title || item.title}
                className="fm-optional-link"
              >
                <p>{item.title}</p>
                <br />
                <span>{item.text}</span>
              </OptionalLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
