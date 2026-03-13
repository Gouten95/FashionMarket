import type { ReactNode } from 'react';

export function renderHighlightedText(text: string): ReactNode[] {
  const parts = text.split(/%([^%]+)%/);

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="fm-highlight-accent">
        {part}
      </span>
    ) : (
      part
    ),
  );
}