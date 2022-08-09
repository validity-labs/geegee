import React, { useEffect } from 'react';

// import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Seo from '@/components/layouts/Seo/Seo';
import InfoSection from '@/components/pages/platform/InfoSection/InfoSection';
import TransactionSection from '@/components/pages/platform/TransactionSection/TransactionSection';

const ns = 'platform';

const PlatformPage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <>
      <Seo ns={ns} />
      <InfoSection />
      <TransactionSection />
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

// export default withPageAuthRequired(PlatformPage);
export default PlatformPage;
