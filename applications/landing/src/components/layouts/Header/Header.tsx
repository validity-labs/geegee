import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Container, /* Fade, */ Hidden, IconButton, Toolbar, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { DebouncedFunc, throttle } from 'lodash';

import ExternalLink from '@/components/general/Link/ExternalLink';
import Link from '@/components/general/Link/Link';
// import SendIcon from '@/components/icons/SendIcon';
import Drawer from '@/components/layouts/Drawer/Drawer';
// import LanguageSwitch from '@/components/layouts/LanguageSwitch/LanguageSwitch';
import Logo from '@/components/layouts/Logo/Logo';
import Menu from '@/components/layouts/Menu/Menu';
import { useApp } from '@/context/AppContext';
// import Search from '@/components/layouts/Search/Search';
// import { SUPPORTED_LANGUAGES } from '@/libs/constants';
import { headerLinks } from '@/libs/menu';
import { MenuItemGroup, MenuItemLink, MenuItemType } from '@/typings/app';

const Root = styled(AppBar)(({ theme }) => ({
  transition: 'all 500ms ease-in',
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
  '.LabHeader-signin': {
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
    },
  },
  '.LabHeader-container': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(6.25),
    borderBottom: `2px solid ${theme.palette.divider}`,
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
}

function MenuItem({ item }: MenuItemProps) {
  const { t } = useTranslation();
  const { type, key } = item;
  const isInternal = type === 'internal';
  const isExternal = type === 'external';
  if (isInternal || isExternal) {
    const { url } = item as MenuItemLink;
    return (
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

export default function Header() {
  const { t } = useTranslation();
  const {
    header: { colorSchema = 'light' },
  } = useApp();
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

  const { trackEvent } = useMatomo();

  const handleTracking = () => {
    console.log('TODO Open contact form');
    trackEvent({ category: 'header', action: 'contact' });
  };

  return (
    <>
      <Root className={onTop /* && !fixedDark */ ? '' : 'show'}>
        <Toolbar>
          <Container className="LabHeader-container">
            {/* @ts-ignore */}
            <Logo component={Link} href="/" mr={17} />
            <Hidden mdDown implementation="css">
              <div className="LabHeader-middle">
                <Links >
                  {headerLinks.map((link) => (
                    <li key={link.key}>
                      <MenuItem item={link} />
                    </li>
                  ))}
                </Links>
              </div>
            </Hidden>
            <div className="LabHeader-right">
              <Hidden mdDown implementation="css">
                <Button
                  onClick={handleTracking}
                  size="small"
                  className="LabHeader-signin"
                >
                  {t('header.signin')}
                </Button>
              </Hidden>
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
