import React /* { useEffect } */ from 'react';

import { useRouter } from 'next/router';

// import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Section from '@/components/layouts/Section/Section';
import Seo from '@/components/layouts/Seo/Seo';
import ProfileSection from '@/components/pages/account/onboarding/ProfileSection';
// import AboutSection from '@/components/pages/root/AboutSection/AboutSection';
// import FaqSection from '@/components/pages/root/FaqSection/FaqSection';
// import HeroSection from '@/components/pages/root/HeroSection/HeroSection';
// import InfoSection from '@/components/pages/root/InfoSection/InfoSection';

const ns = 'login';

const OnboardingPage = () => {
  // const { trackPageView } = useMatomo();

  // useEffect(() => {
  //   trackPageView({});
  // }, [trackPageView]);

  return (
    <>
      <Seo ns={ns} />
      <ProfileSection />

      {/* <HeroSection />
      <AboutSection />
      <InfoSection />
      <FaqSection /> */}
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

export default OnboardingPage;
