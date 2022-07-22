import React, { useEffect } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@/components/layouts/Seo/Seo';
import AboutSection from '@/components/pages/root/AboutSection/AboutSection';
import FaqSection from '@/components/pages/root/FaqSection/FaqSection';
import HeroSection from '@/components/pages/root/HeroSection/HeroSection';
import InfoSection from '@/components/pages/root/InfoSection/InfoSection';
import { FAQGroup } from '@/typings/app';

const ns = 'root';
const faqGroupInfo: FAQGroup<'platform' | 'company'>[] = [{ key: 'platform', count: 3 }, { key: 'company', count: 3 }];

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
      <FaqSection groups={faqGroupInfo} />
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
