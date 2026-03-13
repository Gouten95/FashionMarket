import type { ReactNode } from 'react';

type OptionalLinkProps = {
  href?: string;
  title?: string;
  className?: string;
  children: ReactNode;
};

export const hasUsableHref = (href?: string): boolean => Boolean(href?.trim());

export function OptionalLink({ href, title, className, children }: OptionalLinkProps) {
  if (!hasUsableHref(href)) {
    return <>{children}</>;
  }

  return (
    <a href={href?.trim()} aria-label={title || undefined} className={className}>
      {children}
    </a>
  );
}