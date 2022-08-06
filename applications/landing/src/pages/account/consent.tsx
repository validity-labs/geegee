import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Section from '@/components/layouts/Section/Section';
import Seo from '@/components/layouts/Seo/Seo';
// import AboutSection from '@/components/pages/root/AboutSection/AboutSection';
// import FaqSection from '@/components/pages/root/FaqSection/FaqSection';
// import HeroSection from '@/components/pages/root/HeroSection/HeroSection';
// import InfoSection from '@/components/pages/root/InfoSection/InfoSection';

const ns = 'login';

const ConsentPage = () => {
  // const { trackPageView } = useMatomo();
  const { query: { state } } = useRouter();
  console.log(state);
  // useEffect(() => {
  //   trackPageView({});
  // }, [trackPageView]);

  return (
    <>
      <Seo ns={ns} />
      <Section background='darker'>
        Consent
        <form action={`https://dev-2bbamj2u.us.auth0.com/continue?state=${state}`} method="post">
          <div >
            <label>
              <input type="checkbox" name="confirm" value="yes" /> I agree
            </label>

          </div>
          <input type="hidden" name="form" value="consent" />
          <input type="submit" className="btn btn-lg btn-success" value="Submit" />
        </form>
        {/* <a href="/api/auth/login">Login</a> */}
      </Section>
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

export default ConsentPage;
