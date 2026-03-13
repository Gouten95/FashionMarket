import { Helmet } from '@modern-js/runtime/head';
import type { CSComponent, LandingPageData } from '../../lib/contentstack/landingTypes';
import { Banner } from './Banner';
import { BrandCarousel } from './BrandCarousel';
import { ContentSlot } from './ContentSlot';
import { CtaSection } from './CtaSection';
import { NavSection } from './NavSection';
import { Steps } from './Steps';
import '../../styles/components/landing.css';

type LandingRendererProps = {
  data: LandingPageData;
};

// IDs de Contentstack que pertenecen a la sección hero (banner principal + carrusel de marcas)
const HERO_COMPONENT_IDS = new Set(['bloquePrincipal', 'bloqueMarcas']);

function getComponentId(c: CSComponent): string | null {
  return (
    c.banner?.component_id ??
    c.brand_carousel?.component_id ??
    c.nav_section?.component_id ??
    c.cta_section?.component_id ??
    c.steps?.component_id ??
    c.content_slot?.component_id ??
    null
  );
}

function ComponentRenderer({ component }: { component: CSComponent }) {
  if (component.banner) return <Banner data={component.banner} />;
  if (component.brand_carousel) return <BrandCarousel data={component.brand_carousel} />;
  if (component.nav_section) return <NavSection data={component.nav_section} />;
  if (component.cta_section) return <CtaSection data={component.cta_section} />;
  if (component.steps) return <Steps data={component.steps} />;
  if (component.content_slot) return <ContentSlot data={component.content_slot} />;
  return null;
}

export function LandingRenderer({ data }: LandingRendererProps) {
  const heroComponents = data.component.filter(c => {
    const id = getComponentId(c);
    return id !== null && HERO_COMPONENT_IDS.has(id);
  });

  const contentComponents = data.component.filter(c => {
    const id = getComponentId(c);
    return id === null || !HERO_COMPONENT_IDS.has(id);
  });

  return (
    <div className="fm-landing-page">
      <Helmet>
        <title>{data.seo?.title || data.page_title || 'Fashion Market'}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        {data.seo?.description && <meta name="description" content={data.seo.description} />}
      </Helmet>

      <h1 style={{ display: 'none' }}>Outlet tenis y mas en Fashion Market</h1>

      <div className="fm-landing-hero mx-auto mt-5 w-full max-w-[1170px] md:mb-[62px]">
        <h1 style={{ display: 'none' }}>
          Outlet : Marcas exclusivas en ropa, tenis y mucho mas
        </h1>
        <h2 style={{ display: 'none' }}>Outlet de marcas Fashion Market</h2>
        {heroComponents.map((c, i) => (
          <ComponentRenderer key={i} component={c} />
        ))}
      </div>

      <div className="fm-landing-content mx-auto max-w-[1170px] text-center">
        {contentComponents.map((c, i) => (
          <ComponentRenderer key={i} component={c} />
        ))}
      </div>
    </div>
  );
}
