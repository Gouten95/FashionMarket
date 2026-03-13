import { useEffect, useMemo, useState } from 'react';
import type { LoaderFunction } from '@modern-js/runtime/router';
import { useLoaderData } from '@modern-js/runtime/router';
import { fetchLandingPageData } from '../lib/contentstack';
import type { LandingPageData } from '../lib/contentstack';
import { LandingRenderer } from '../components/landing/LandingRenderer';

export const loader: LoaderFunction = async () => {
  return fetchLandingPageData();
};

const Index = () => {
  const loaderData = useLoaderData() as LandingPageData | null | undefined;
  const [clientData, setClientData] = useState<LandingPageData | null>(loaderData || null);

  useEffect(() => {
    if (loaderData) {
      setClientData(loaderData);
      return;
    }

    let active = true;

    fetchLandingPageData().then(data => {
      if (!active) {
        return;
      }

      setClientData(data);
    });

    return () => {
      active = false;
    };
  }, [loaderData]);

  const data = useMemo(() => loaderData || clientData, [clientData, loaderData]);

  if (!data) return null;

  return <LandingRenderer data={data} />;
};

export default Index;
