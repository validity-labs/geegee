import React, { useEffect } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@/components/layouts/Seo/Seo';
import HeroSection from '@/components/pages/error/HeroSection/HeroSection';
import { ConfigProps } from '@/typings/app';

interface Props {
  statusCode?: number;
}

const ns = 'error';

const ErrorPage = ({ statusCode }: Props) => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <>
      <Seo ns={ns} />
      <HeroSection statusCode={statusCode} />
    </>
  );
};

export const getServerSideProps = async ({ res, err, locale }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  // const [common] = await getDataFor('error');
  return {
    props: {
      ns,
      // common,
      config: {
        header: {
          colorSchema: 'dark',
        },
      } as ConfigProps,
      statusCode,
      ...(await serverSideTranslations(locale, ['common', ns])),
    },
  };
};

export default ErrorPage;
