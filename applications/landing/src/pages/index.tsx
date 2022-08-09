import React, { useEffect } from 'react';

// import { useUser } from '@auth0/nextjs-auth0';
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
  // const { user, isLoading, error } = useUser();
  // const isUserIn = !isLoading && !error && user;
  // const { nickname = '', extra: { consent = false, interests = [] } } = user || { extra: {} };
  // console.log(isUserIn, user, user?.extra)
  return (
    <>
      <Seo ns={ns} />
      {/* {isUserIn && (
        <Section>
          <Typography>{nickname}</Typography>
          <Typography>Consent: {consent ? 'Yes' : 'No'}</Typography>
          <Typography>{typeof interests === 'string' ? interests : interests.join(', ')}</Typography>
        </Section>)} */}
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
