import React, { useEffect } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@/components/layouts/Seo/Seo';
import HeroSection from '@/components/pages/root/HeroSection/HeroSection';

const ns = 'root';

const IndexPage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <>
      <Seo ns={ns} />
      <HeroSection />
    </>
  );
};

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ns,
      ...(await serverSideTranslations(locale, ['common', ns])),
    },
  };
};

export default IndexPage;
