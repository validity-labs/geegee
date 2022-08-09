import { ReactElement, ReactNode } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Typography } from '@mui/material';

import BaseLayout from '../BaseLayout/BaseLayout';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { DASHBOARD_PAGES } from '@/libs/constants';
interface IProps {
  children: ReactNode;
}

export default function Layout(props: IProps): ReactElement {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const { children } = props;

  /* Choose between BaseLayout and DashboardLayout based on pathname */
  const isDashboardLayout = DASHBOARD_PAGES.indexOf(pathname) !== -1;
  return (
    <>
      <Typography component="a" className="aria" href="#main">
        {t('common.skip-to-main')}
      </Typography>
      {isDashboardLayout ?
        <DashboardLayout>{children}</DashboardLayout>
        : <BaseLayout>{children}</BaseLayout>}
    </>
  );
}
