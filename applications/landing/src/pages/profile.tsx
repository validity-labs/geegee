

import React, { useEffect } from 'react';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Section from '@/components/layouts/Section/Section';
import Seo from '@/components/layouts/Seo/Seo';

const ns = 'logout';

const ProfilePage = () => {

  const account = useUser();
  console.log(account);
  const { user, error, isLoading } = account;
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Seo ns={ns} />
      <Section background='darker'>
        {user && (
          <>
            <div>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <a href="/api/auth/logout">Logout</a>
          </>
        )}
      </Section>
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

export default withPageAuthRequired(ProfilePage);



// export const getServerSideProps = (ctx) => {
//   const returnTo = getFullReturnTo(ctx.req);
//   return withPageAuthRequired({ returnTo })(ctx);
// };
