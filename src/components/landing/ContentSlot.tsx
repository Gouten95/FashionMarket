import type { CSContentSlotComponent } from '../../lib/contentstack/landingTypes';

type ContentSlotProps = {
  data: CSContentSlotComponent;
};

export function ContentSlot({ data }: ContentSlotProps) {
  if (!data.text) return null;

  return (
    <div
      className="fm-seo-content text-left"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: data.text }}
    />
  );
}
