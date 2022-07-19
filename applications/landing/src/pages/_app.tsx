import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation, useTranslation } from 'next-i18next';

import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import createEmotionCache from '../createEmotionCache';
import theme from '../theme';
import Footer from '@/components/layouts/Footer/Footer';
import Header from '@/components/layouts/Header/Header';
import Layout from '@/components/layouts/Layout/Layout';
import { I18nPageNamespace } from '@/components/layouts/Seo/Seo';
import { AppProvider } from '@/context/AppContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { MATOMO_BASE_URL, MATOMO_SITE_ID, MATOMO_SRC_URL, MATOMO_TRACKER_URL } from '@/libs/constants';
import { ConfigProps /* Language  , Settings  */ } from '@/typings/app';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: {
    ns: I18nPageNamespace;
    // common: Settings;
    config?: ConfigProps;
    [key: string]: any;
  };
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { t } = useTranslation();

  const matomoInstance = createInstance({
    urlBase: MATOMO_BASE_URL,
    siteId: Number(MATOMO_SITE_ID),
    trackerUrl: MATOMO_TRACKER_URL,
    srcUrl: MATOMO_SRC_URL,
  });

  return (
    <MatomoProvider value={matomoInstance}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Crypto Audit</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppProvider value={{ /* common: pageProps.common, */ ns: pageProps.ns, config: pageProps.config }}>
            <SnackbarProvider>
              <Typography component="a" className="aria" href="#main">
                {t('common.skip-to-main')}
              </Typography>
              <Header />
              <Layout>
                {/* @ts-ignore */}
                <Component {...pageProps} />
              </Layout>
              <Footer />
            </SnackbarProvider>
          </AppProvider>
        </ThemeProvider>
      </CacheProvider>
    </MatomoProvider>
  );
};

export default appWithTranslation(MyApp);
