import {
  CONTENTSTACK_API_KEY,
  CONTENTSTACK_BRANCH,
  CONTENTSTACK_CONTENT_TYPE_UID,
  CONTENTSTACK_DELIVERY_TOKEN,
  CONTENTSTACK_ENTRY_UID,
  CONTENTSTACK_ENVIRONMENT,
  REQUIRED_CHANNEL_OPTION,
  getDeliveryHostByRegion,
} from './config';
import type { ContentstackEntry } from './types';

const toStringList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .map(item => item.trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }

  return [];
};

const hasRequiredChannelSelection = (entry: ContentstackEntry): boolean => {
  if (!REQUIRED_CHANNEL_OPTION) {
    return true;
  }

  const channelField = entry.channel as Record<string, unknown> | undefined;

  if (!channelField || typeof channelField !== 'object') {
    return false;
  }

  const selectedOptions = toStringList(channelField.channel);

  return selectedOptions.includes(REQUIRED_CHANNEL_OPTION);
};

export const hasContentstackCredentials = (): boolean => {
  return Boolean(CONTENTSTACK_API_KEY && CONTENTSTACK_DELIVERY_TOKEN && CONTENTSTACK_ENVIRONMENT);
};

type FetchEntryOptions = {
  contentTypeUid?: string;
  entryUid?: string;
  requireChannelSelection?: boolean;
};

export const fetchEntryFromDeliveryApi = async (
  options: FetchEntryOptions = {},
): Promise<ContentstackEntry | null> => {
  if (!hasContentstackCredentials()) {
    return null;
  }

  const {
    contentTypeUid = CONTENTSTACK_CONTENT_TYPE_UID,
    entryUid = CONTENTSTACK_ENTRY_UID,
    requireChannelSelection = true,
  } = options;

  const baseUrl = getDeliveryHostByRegion();
  const hasEntryUid = Boolean(entryUid);

  const path = hasEntryUid
    ? `/v3/content_types/${contentTypeUid}/entries/${entryUid}`
    : `/v3/content_types/${contentTypeUid}/entries`;

  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.set('environment', CONTENTSTACK_ENVIRONMENT);

  const headers: Record<string, string> = {
    api_key: CONTENTSTACK_API_KEY,
    access_token: CONTENTSTACK_DELIVERY_TOKEN,
  };

  if (CONTENTSTACK_BRANCH) {
    headers.branch = CONTENTSTACK_BRANCH;
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Contentstack API ${response.status}: ${text}`);
  }

  const data = (await response.json()) as {
    entry?: ContentstackEntry;
    entries?: Array<ContentstackEntry>;
  };

  if (data.entry) {
    if (!requireChannelSelection) {
      return data.entry;
    }

    return hasRequiredChannelSelection(data.entry) ? data.entry : null;
  }

  if (Array.isArray(data.entries) && data.entries[0]) {
    if (!requireChannelSelection) {
      return data.entries[0] ?? null;
    }

    return data.entries.find(entry => hasRequiredChannelSelection(entry)) ?? null;
  }

  return null;
};
