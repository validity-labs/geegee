import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// import { useMatomo } from '@datapunt/matomo-tracker-react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Container, /* Fade, */ Hidden, IconButton, Toolbar, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { DebouncedFunc, throttle } from 'lodash';

import AccountInfo from '../AccountInfo/AccountInfo';
import ExternalLink from '@/components/general/Link/ExternalLink';
import Link from '@/components/general/Link/Link';
import ExitIcon from '@/components/icons/ExitIcon';
// import SendIcon from '@/components/icons/SendIcon';
import Drawer from '@/components/layouts/Drawer/Drawer';
// import LanguageSwitch from '@/components/layouts/LanguageSwitch/LanguageSwitch';
import Logo from '@/components/layouts/Logo/Logo';
import Menu from '@/components/layouts/Menu/Menu';
import { useAccount, useApp } from '@/context/AppContext';
import { ACCOUNT_LOGIN_URL, ACCOUNT_LOGOUT_URL } from '@/libs/constants';
// import Search from '@/components/layouts/Search/Search';
// import { SUPPORTED_LANGUAGES } from '@/libs/constants';
import { headerLinks } from '@/libs/menu';
import { MenuItemGroup, MenuItemLink, MenuItemType } from '@/typings/app';

// interface Document {
//   documentMode?: any;
//   getElementById: any;
// }

// interface Window {
//   StyleMedia?: any;
// }

const Root = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isBaseLayout',
})<{ isBaseLayout: boolean; }>(({ theme, isBaseLayout }) => ({
  transition: 'all 500ms ease-in',
  ...(isBaseLayout ? {
  } : {
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  '& .logo': {
    animation: 'fadeIn 300ms cubic-bezier(0.65, 0, 0.076, 1)',
  },
  '&.show': {
    backdropFilter: 'blur(24px)',
    mixBlendMode: 'normal',
    backgroundColor: 'rgba(0,0,0, 0.85)',
    '& .logo': {
      animation: 'fadeInAlt 300ms cubic-bezier(0.65, 0, 0.076, 1)',
    },
  },
  '.LabHeader-button': {
    marginLeft: theme.spacing(10),
  },
  '.LabHeader-container': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(6.25),
    ...(isBaseLayout ? {
      borderBottom: `1px solid ${theme.palette.divider}`,
    } : {}),
  },
  '.LabHeader-middle': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '.LabHeader-right': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: theme.spacing(6),
  },
  '.LabHeader-nav': {
    fontSize: '1rem',
    fontFamily: 'Audiowide, cursive',
    padding: '8px 30px',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const Links = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '& a, .MuiLink-root': {
    padding: theme.spacing(2, 7.5),
    whiteSpace: 'nowrap',
    ...theme.typography.h6,
    fontSize: '0.875rem', // 14px
    transition: 'color 0.4s',
    '&:hover, &.active': {
      color: theme.palette.text.active,
      transition: 'color 0.4s ease-out',
    },
  },
}));

interface MenuItemProps {
  item: MenuItemType;
  onClick?: any;
}

function MenuItem({ item }: MenuItemProps) {
  const { t } = useTranslation();
  const { type, key } = item;
  const isInternal = type === 'internal';
  const isExternal = type === 'external';

  // const scrollToAnchor = (anchor: string) => {
  //   const _document = document as Document;
  //   const _window = window as Window;

  //   // @see https://stackoverflow.com/a/9851769
  //   // Internet Explorer 6-11
  //   /* eslint-disable */
  //   const isIE = /*@cc_on!@*/ false || Boolean(_document.documentMode);
  //   /* eslint-enable */
  //   // Edge 20+
  //   const isEdge = !isIE && Boolean(_window.StyleMedia);

  //   if (isIE || isEdge) {
  //     window.location.hash = `#${anchor}`;
  //   } else {
  //     window.scrollTo({
  //       top: _document.getElementById(anchor).offsetTop,
  //       behavior: 'smooth',
  //     });
  //   }
  // };

  if (isInternal || isExternal) {
    const { url } = item as MenuItemLink;
    return (
      // {/* <Typography className="LabHeader-nav" /* onClick={() => scrollToAnchor(url)} */> */}
      <Typography component={isInternal ? Link : ExternalLink} href={url} sx={{ fontSize: '1rem' }}>
        <span>{t(`menu.${key}.title`)}</span>
      </Typography>
    );
  }

  if (type === 'group') {
    return <Menu parentKey={key} items={(item as MenuItemGroup).items} />;
  }

  return null;
}

interface Props {
  type?: 'base' | 'dashboard';
}

export default function Header({ type = 'base' }: Props) {
  const { t } = useTranslation();

  const {
    header: { colorSchema = 'light' },
  } = useApp();
  const { pathname } = useRouter();
  const isUserArea = pathname.indexOf('/account/') !== -1;

  const { isOnline } = useAccount();

  const [drawer, setDrawer] = useState(false);
  const theme = useTheme();
  // const [searchOpen, setSearchOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setDrawer((prevDrawer) => !prevDrawer);
  }, [setDrawer]);
  const handleScrollRef = useRef<DebouncedFunc<() => void> | null>(null);

  const [onTop, setOnTop] = useState(true);
  // recreate scroll event listerner every time dependency changes
  useEffect(() => {
    // remove event listener if exist
    if (handleScrollRef.current) {
      window.removeEventListener('scroll', handleScrollRef.current);
      handleScrollRef.current = null;
    }

    // add event listener if page require toolbar background change
    handleScrollRef.current = throttle(() => {
      setOnTop(window.scrollY <= 100);
    }, 300);
    handleScrollRef.current();
    window.addEventListener('scroll', handleScrollRef.current);

    return () => {
      // remove event listener if exist
      if (handleScrollRef.current) {
        window.removeEventListener('scroll', handleScrollRef.current);
        handleScrollRef.current = null;
      }
    };
  }, [colorSchema, theme]);

  // const { trackEvent } = useMatomo();
  // const router = useRouter();

  // const handleTracking = () => {
  //   console.log('TODO Open contact form');
  //   trackEvent({ category: 'header', action: 'contact' });
  //   router.push('/login');
  // };

  const isBaseLayout = type === 'base';

  return (
    <>
      <Root position={isBaseLayout ? 'fixed' : 'static'} isBaseLayout={isBaseLayout} className={onTop /* && !fixedDark */ ? '' : 'show'}>
        <Toolbar>
          <Container className="LabHeader-container">
            {/* @ts-ignore */}
            <Logo component={Link} href="/" mr={17} />
            {isBaseLayout && (
              <Hidden mdDown implementation="css">
                <div className="LabHeader-middle">
                  <Links>
                    {headerLinks.map((link) => (
                      <li key={link.key}>
                        <MenuItem item={link} />
                      </li>
                    ))}
                  </Links>
                </div>
              </Hidden>
            )}
            <div className="LabHeader-right">
              {isOnline &&
                <Hidden mdDown implementation="css">
                  <AccountInfo />
                </Hidden>}
              {isBaseLayout && !isUserArea && (
                <Hidden mdDown implementation="css">
                  {isOnline ? (
                    <Button
                      // onClick={handleTracking}
                      component="a"
                      href={ACCOUNT_LOGOUT_URL}
                      size="small"
                      className="LabHeader-button"
                      endIcon={<ExitIcon />}
                    >
                      {t('header.logout')}
                    </Button>
                  ) : (
                    <Button
                      // onClick={handleTracking}
                      component="a"
                      href={ACCOUNT_LOGIN_URL}
                      size="small"
                      className="LabHeader-button"
                    >
                      {t('header.signin')}
                    </Button>
                  )}
                </Hidden>
              )}
              <Hidden mdUp implementation="css">
                <IconButton
                  size="medium"
                  aria-label={t('header.toggle-menu')}
                  onClick={toggleDrawer}
                  sx={{ color: 'text.active' }}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
              </Hidden>
            </div>
          </Container>
        </Toolbar>
      </Root>
      <Drawer open={drawer} toggle={setDrawer} />
    </>
  );
}
