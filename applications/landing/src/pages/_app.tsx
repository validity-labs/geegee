// import { useEffect } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import { UserProvider } from '@auth0/nextjs-auth0';
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import createEmotionCache from '../createEmotionCache';
// import { initContract } from '../libs/near-api';
import theme from '../theme';
import Layout from '@/components/layouts/Layout/Layout';
import { I18nPageNamespace } from '@/components/layouts/Seo/Seo';
import { AppProvider } from '@/context/AppContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { WalletSelectorContextProvider } from '@/context/WalletSelectorContext';
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
  const { Component, emotionCache = clientSideEmotionCache, pageProps/* , router: { locale } */ } = props;
  const matomoInstance = createInstance({
    urlBase: MATOMO_BASE_URL,
    siteId: Number(MATOMO_SITE_ID),
    trackerUrl: MATOMO_TRACKER_URL,
    srcUrl: MATOMO_SRC_URL,
  });

  // useEffect(() => {
  //   (async () => {
  //     await initContract();
  //     console.log(window.accountId);
  //   })();
  // }, []);

  // rerender tree so on language change date-io locale is applied properly
  // const [, setDateLocale] = useState<Language | undefined>();

  // useEffect(() => {
  //   // on language change, change date-io locale with dynamic load
  //   changeDateIOLocale(locale as Language).then(() => {
  //     setDateLocale(locale as Language);
  //   });
  // }, [locale]);

  return (
    <MatomoProvider value={matomoInstance}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Geegee platform</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <UserProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <WalletSelectorContextProvider>
              <AppProvider value={{ /* common: pageProps.common, */ ns: pageProps.ns, config: pageProps.config }}>
                <SnackbarProvider>
                  <Layout>
                    {/* @ts-ignore */}
                    <Component {...pageProps} />
                  </Layout>
                </SnackbarProvider>
              </AppProvider>
            </WalletSelectorContextProvider>
          </ThemeProvider>
        </UserProvider>
      </CacheProvider>
    </MatomoProvider>
  );
};

export default appWithTranslation(MyApp);
