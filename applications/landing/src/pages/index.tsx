import React, { useEffect } from 'react';

import { useUser } from '@auth0/nextjs-auth0';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Section from '@/components/layouts/Section/Section';
import Seo from '@/components/layouts/Seo/Seo';
import AboutSection from '@/components/pages/root/AboutSection/AboutSection';
import FaqSection from '@/components/pages/root/FaqSection/FaqSection';
import HeroSection from '@/components/pages/root/HeroSection/HeroSection';
import InfoSection from '@/components/pages/root/InfoSection/InfoSection';

const ns = 'root';

const IndexPage = () => {
  const { trackPageView } = useMatomo();
  const { user, isLoading, error } = useUser();
  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);
  const isUserIn = !isLoading && !error && user;
  const { nickname = '', extra: { consent = false, interests = [] } } = user || { extra: {} };
  console.log(user, nickname, consent, interests)
  return (
    <>
      <Seo ns={ns} />
      {isUserIn && (
        <Section background="darker">
          <Typography>{nickname}</Typography>
          <Typography>Consent: {consent ? 'Yes' : 'No'}</Typography>
          <Typography>{typeof interests === 'string' ? interests : interests.join(', ')}</Typography>
        </Section>)}
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
