const CONTENTSTACK_REGION = process.env.CONTENTSTACK_REGION || 'US';

export const CONTENTSTACK_API_KEY = process.env.CONTENTSTACK_API_KEY || '';
export const CONTENTSTACK_DELIVERY_TOKEN = process.env.CONTENTSTACK_DELIVERY_TOKEN || '';
export const CONTENTSTACK_ENVIRONMENT = process.env.CONTENTSTACK_ENVIRONMENT || '';
export const CONTENTSTACK_BRANCH = process.env.CONTENTSTACK_BRANCH || '';
export const CONTENTSTACK_CONTENT_TYPE_UID =
  process.env.CONTENTSTACK_CONTENT_TYPE_UID || 'global_header';
export const CONTENTSTACK_ENTRY_UID =
  process.env.CONTENTSTACK_ENTRY_UID || 'bltaf1d4c11d7b3416d';
export const CONTENTSTACK_FOOTER_CONTENT_TYPE_UID =
  process.env.CONTENTSTACK_FOOTER_CONTENT_TYPE_UID || 'global_footer';
export const CONTENTSTACK_FOOTER_ENTRY_UID =
  process.env.CONTENTSTACK_FOOTER_ENTRY_UID || 'blt188087aab5c28ebf';
export const CONTENTSTACK_LOGO_FIELD_UID = process.env.CONTENTSTACK_LOGO_FIELD_UID || 'media';
export const CONTENTSTACK_LANDING_CONTENT_TYPE_UID =
  process.env.CONTENTSTACK_LANDING_CONTENT_TYPE_UID || 'landing_page';
export const CONTENTSTACK_LANDING_ENTRY_UID =
  process.env.CONTENTSTACK_LANDING_ENTRY_UID || 'bltc03330225be2720b';
export const REQUIRED_CHANNEL_OPTION = (
  process.env.CONTENTSTACK_REQUIRED_CHANNEL_OPTION || 'FashionMarket'
).trim();

export const DEFAULT_LOGO_URL = 'img/Logo.png';

const REGION_HOSTS: Record<string, string> = {
  US: 'https://cdn.contentstack.io',
  EU: 'https://eu-cdn.contentstack.com',
  AZURE_NA: 'https://azure-na-cdn.contentstack.com',
  AZURE_EU: 'https://azure-eu-cdn.contentstack.com',
  GCP_NA: 'https://gcp-na-cdn.contentstack.com',
};

const parseRegion = (region: string) => {
  switch (region.toUpperCase()) {
    case 'EU':
      return 'EU';
    case 'AZURE_NA':
      return 'AZURE_NA';
    case 'AZURE_EU':
      return 'AZURE_EU';
    case 'GCP_NA':
      return 'GCP_NA';
    case 'US':
    default:
      return 'US';
  }
};

export const getDeliveryHostByRegion = (): string => {
  const region = parseRegion(CONTENTSTACK_REGION);
  return REGION_HOSTS[region] || REGION_HOSTS.US;
};
