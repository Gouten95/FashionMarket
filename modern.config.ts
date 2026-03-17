import { appTools, defineConfig } from '@modern-js/app-tools';
import 'dotenv/config';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  plugins: [appTools()],
  output: {
    distPath: {
      root: 'dist',
    },
  },
  server: {
    ssr: true,
  },
  html: {
    favicon: './config/favicon.ico',
  },
  source: {
    define: {
      'process.env.CONTENTSTACK_API_KEY': JSON.stringify(
        process.env.CONTENTSTACK_API_KEY || '',
      ),
      'process.env.CONTENTSTACK_DELIVERY_TOKEN': JSON.stringify(
        process.env.CONTENTSTACK_DELIVERY_TOKEN || '',
      ),
      'process.env.CONTENTSTACK_ENVIRONMENT': JSON.stringify(
        process.env.CONTENTSTACK_ENVIRONMENT || '',
      ),
      'process.env.CONTENTSTACK_REGION': JSON.stringify(
        process.env.CONTENTSTACK_REGION || 'US',
      ),
      'process.env.CONTENTSTACK_BRANCH': JSON.stringify(
        process.env.CONTENTSTACK_BRANCH || '',
      ),
      'process.env.CONTENTSTACK_CONTENT_TYPE_UID': JSON.stringify(
        process.env.CONTENTSTACK_CONTENT_TYPE_UID || 'global_header',
      ),
      'process.env.CONTENTSTACK_ENTRY_UID': JSON.stringify(
        process.env.CONTENTSTACK_ENTRY_UID || 'bltaf1d4c11d7b3416d',
      ),
      'process.env.CONTENTSTACK_FOOTER_CONTENT_TYPE_UID': JSON.stringify(
        process.env.CONTENTSTACK_FOOTER_CONTENT_TYPE_UID || 'global_footer',
      ),
      'process.env.CONTENTSTACK_FOOTER_ENTRY_UID': JSON.stringify(
        process.env.CONTENTSTACK_FOOTER_ENTRY_UID || 'blt188087aab5c28ebf',
      ),
      'process.env.CONTENTSTACK_LOGO_FIELD_UID': JSON.stringify(
        process.env.CONTENTSTACK_LOGO_FIELD_UID || 'media',
      ),
      'process.env.CONTENTSTACK_LANDING_CONTENT_TYPE_UID': JSON.stringify(
        process.env.CONTENTSTACK_LANDING_CONTENT_TYPE_UID || 'landing_page',
      ),
      'process.env.CONTENTSTACK_LANDING_ENTRY_UID': JSON.stringify(
        process.env.CONTENTSTACK_LANDING_ENTRY_UID || 'bltc03330225be2720b',
      ),
      'process.env.CONTENTSTACK_REQUIRED_CHANNEL_OPTION': JSON.stringify(
        process.env.CONTENTSTACK_REQUIRED_CHANNEL_OPTION || 'FashionMarket',
      ),
    },
  },
});
