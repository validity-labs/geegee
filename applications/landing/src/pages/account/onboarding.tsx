import React, { useEffect } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@/components/layouts/Seo/Seo';
import ProfileSection from '@/components/pages/account/onboarding/ProfileSection';

const ns = 'account-onboarding';

const OnboardingPage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <>
      <Seo ns={ns} />
      <ProfileSection />
    </>
  );
};

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ns,
      ...(await serverSideTranslations(locale, ['common', 'yup', ns])),
    },
  };
};

export default OnboardingPage;
