import React, { useEffect } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@/components/layouts/Seo/Seo';
import AboutSection from '@/components/pages/root/AboutSection/AboutSection';
import FaqSection from '@/components/pages/root/FaqSection/FaqSection';
import HeroSection from '@/components/pages/root/HeroSection/HeroSection';
import InfoSection from '@/components/pages/root/InfoSection/InfoSection';

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
      <AboutSection />
      <InfoSection />
      <FaqSection />
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