import React, { useEffect } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@/components/layouts/Seo/Seo';
import GallerySection from '@/components/pages/about/GallerySection/GallerySection';
import HeroSection from '@/components/pages/about/HeroSection/HeroSection';
import TeamSection from '@/components/pages/about/TeamSection/TeamSection';
import ValueSection from '@/components/pages/about/ValueSection/ValueSection';
import BookSection from '@/components/section/BookSection/BookSection';
import { ExternalImage } from '@/typings/app';

const ns = 'about';

const teamGalleryItems: Pick<ExternalImage, 'url'>[] = [
  {
    url: '/images/pages/about/gallery/andre-wolke.jpg',
  },
  {
    url: '/images/pages/about/gallery/jonas-siegl.jpg',
  },
  {
    url: '/images/pages/about/gallery/konstantinos-paschalidis.jpg',
  },
  {
    url: '/images/pages/about/gallery/patrice-juergens.jpg',
  },
];

const teamItems: Pick<ExternalImage, 'url'>[] = [{ url: '/images/pages/about/team/andre-wolke.jpg' }];

const valueItems: number[] = [1, 2, 3, 4];

const AboutPage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <>
      <Seo ns={ns} />
      <HeroSection />
      <GallerySection items={teamGalleryItems} />
      <TeamSection items={teamItems} />
      <ValueSection items={valueItems} />
      <BookSection />
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

export default AboutPage;
