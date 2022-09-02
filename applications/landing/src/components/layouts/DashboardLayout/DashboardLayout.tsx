import { ReactElement, ReactNode } from 'react';

import { GlobalStyles } from '@mui/material';
import { styled } from "@mui/material/styles";

import DashboardDrawer from '../DashboardDrawer/DashboardDrawer';
import Footer from '@/components/layouts/Footer/Footer';
import Header from '@/components/layouts/Header/Header';

const Root = styled('main')(({ theme }) => ({
  // flex: 1,
  '.LabDashboardLayout-wrapper': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    //   // display: 'flex',
    //   // overflow: 'hidden',
  },
  '.LabDashboardLayout-innerWrapper': {
    flex: 1,
  },
  // '.LabDashboardLayout-wrapper2': {
  //   flexGrow: 1,
  //   /* , p: 3 */
  //   overflow: 'auto',
  //   height: '100%',

  // },
  [theme.breakpoints.up("md")]: {},
}));

const globalStyles = {
  'html, body': {
    overflow: 'hidden',
  },
  '#__next': {
    display: 'flex',
    flexDirection: 'row',
    'height': '100%',
    overflow: 'hidden',
  },
  main: {
    'height': '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
};

interface IProps {
  children: ReactNode;
}

/* @ts-ignore */
const injectGlobalStyles = <GlobalStyles styles={globalStyles} />

export default function DashboardLayout(props: IProps): ReactElement {
  const { children } = props;
  return (
    <>
      {injectGlobalStyles}
      <DashboardDrawer />
      <Root id="main" /* tabIndex={-1} */>
        <Header type="dashboard" />
        <div className="LabDashboardLayout-wrapper">
          <div className="LabDashboardLayout-innerWrapper">
            {children}
          </div>
          <Footer dense />
        </div>
      </Root>
    </>
  );
}
