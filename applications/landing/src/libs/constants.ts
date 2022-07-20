import getConfig from './env';
import { Language } from '@/typings/app';

const {
  publicRuntimeConfig: { matomoSiteId, matomoBaseUrl, matomoTrackerUrl, matomoSrcUrl },
} = getConfig();

export const MATOMO_SITE_ID = matomoSiteId;
export const MATOMO_BASE_URL = matomoBaseUrl;
export const MATOMO_TRACKER_URL = matomoTrackerUrl;
export const MATOMO_SRC_URL = matomoSrcUrl;

// export const DEFAULT_LANGUAGE: Language = 'en';
export const SUPPORTED_LANGUAGES: Language[] = ['en' /* , 'de' */];

export const ITEMS_PER_PAGE = 2;

export const TABLE_ROWS_PER_PAGE = 2;
export const TABLE_ROWS_PER_PAGE_OPTIONS = [2, 10, 25, 50];

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

export const DEFAULT_DATE_PRETTY_FORMAT = 'MMMM d, yyyy';

export const DEFAULT_DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';
