import React, { useEffect } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@/components/layouts/Seo/Seo';
import ApproachSection from '@/components/pages/service/ApproachSection/ApproachSection';
import BenefitSection from '@/components/pages/service/BenefitSection/BenefitSection';
import HeroSection from '@/components/pages/service/HeroSection/HeroSection';
import InfoSection from '@/components/pages/service/InfoSection/InfoSection';
import BookSection from '@/components/section/BookSection/BookSection';
import QuoteSection from '@/components/section/QuoteSection/QuoteSection';

const ns = 'service';

const quoteItems = ['/images/pages/service/quote/quoter1.jpg', '/images/pages/service/quote/quoter2.jpg'];

const benefitItems = ['benefit1.svg', 'benefit2.svg', 'benefit3.svg', 'benefit4.svg'];

const ServicePage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <>
      <Seo ns={ns} />
      <HeroSection />
      <InfoSection />
      <ApproachSection />
      <BookSection />
      <BenefitSection items={benefitItems} />
      <QuoteSection items={quoteItems} />
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

export default ServicePage;
