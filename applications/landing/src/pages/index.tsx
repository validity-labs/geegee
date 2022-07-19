import React, { useEffect } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@/components/layouts/Seo/Seo';
import BenefitSection from '@/components/pages/root/BenefitSection/BenefitSection';
import BlogSection from '@/components/pages/root/BlogSection/BlogSection';
import BookSection from '@/components/pages/root/BookSection/BookSection';
import HeroSection from '@/components/pages/root/HeroSection/HeroSection';
import ServiceSection from '@/components/pages/root/ServiceSection/ServiceSection';
import TeamSection from '@/components/pages/root/TeamSection/TeamSection';
import QuoteSection from '@/components/section/QuoteSection/QuoteSection';

const ns = 'root';

const quoteItems = ['/images/pages/landing/quote/quoter1.jpg', '/images/pages/landing/quote/quoter2.jpg'];

const blogItems = [
  {
    url: '/blog1',
    poster: '/images/pages/landing/blog/poster1.jpg',
  },
  {
    url: '/blog2',
    poster: '/images/pages/landing/blog/poster2.jpg',
  },
  {
    url: '/blog3',
    poster: '/images/pages/landing/blog/poster3.jpg',
  },
];

const IndexPage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <>
      <Seo ns={ns} />
      <HeroSection />
      <ServiceSection />
      <TeamSection />
      <BenefitSection />
      <BookSection />
      {/* ClientSection */}
      <QuoteSection items={quoteItems} mode="shifted" />
      <BlogSection items={blogItems} />
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
