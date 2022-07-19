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

const StyledAppBar = styled(AppBar)({
  transition: 'all 500ms ease-in',
  '& .logo': {
    animation: 'fadeIn 300ms cubic-bezier(0.65, 0, 0.076, 1)',
  },
  '&.show': {
    backdropFilter: 'blur(24px)',
    mixBlendMode: 'normal',
    backgroundColor: 'rgba(255,255,255, 0.85)',
    '& .logo': {
      animation: 'fadeInAlt 300ms cubic-bezier(0.65, 0, 0.076, 1)',
    },
  },
});

const MiddleSide = styled('div')({
  position: 'relative',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const RightSide = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Links = styled('ul', {
  shouldForwardProp: (prop) => prop !== 'isDark',
})<{ isDark: boolean }>(({ theme, isDark }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '& a, .MuiLink-root': {
    padding: theme.spacing(2, 4),
    whiteSpace: 'nowrap',
    color: isDark ? theme.palette.text.primary : theme.palette.text.contrast,
    transition: 'color 0.4s',
    '&:hover, &.active': {
      color: theme.palette.text.active,
      // textShadow: `0px 0px 1px currentColor`,
      transition: 'color 0.4s ease-out',
    },
    span: {
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: -4,
        right: 0,
        width: 0,
        height: 2,
        borderRadius: 2,
        backgroundColor: 'transparent',
        transition: 'width 0.2s',
      },
    },
    '&.active': {
      span: {
        position: 'relative',
        '&:after': {
          width: ['80%', 'calc(100% - 1ch)'],
          backgroundColor: theme.palette.text.active,
          transition: 'width 0.4s ease-out',
        },
      },
    },
  },
}));

// const TopBar = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   height: 40,
//   color: theme.palette.primary.contrastText,
//   backgroundColor: theme.palette.background.main,
// }));

interface MenuItemProps {
  item: MenuItemType;
  isDark: boolean;
}

function MenuItem({ item, isDark }: MenuItemProps) {
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
    return <Menu parentKey={key} items={(item as MenuItemGroup).items} isDark={isDark} />;
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

  const isDark = colorSchema === 'dark' || !onTop;

  const { trackEvent } = useMatomo();

  const handleTracking = () => {
    console.log('TODO Open contact form');
    trackEvent({ category: 'header', action: 'contact' });
  };

  return (
    <>
      <StyledAppBar className={onTop /* && !fixedDark */ ? '' : 'show'}>
        <Toolbar>
          {/* {SUPPORTED_LANGUAGES.length > 1 && (
            <TopBar>
              <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LanguageSwitch />
              </Container>
            </TopBar>
          )} */}
          <Container sx={{ flex: 1, display: 'flex', alignItems: 'center', pt: 7, pb: 6.25 }}>
            {/* @ts-ignore */}
            <Logo component={Link} href="/" mr={17} isLight={!isDark} />

            <RightSide sx={{ flex: 1, display: 'flex', alignItems: 'center', ml: 6 }}>
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
              <Hidden mdDown implementation="css">
                <MiddleSide>
                  <Links isDark={isDark}>
                    {headerLinks.map((link) => (
                      <li key={link.key}>
                        <MenuItem item={link} isDark={isDark} />
                      </li>
                    ))}
                  </Links>
                  <Button
                    onClick={handleTracking}
                    // variant="containedIcon"
                    size="small"
                    // color="secondary"
                    // component={Link}
                    // href={contactHref}
                    // sx={{ fontWeight: 600 }}
                    // endIcon={<SendIcon />}
                  >
                    {t('header.contact')}
                  </Button>
                </MiddleSide>
              </Hidden>
            </RightSide>
          </Container>
        </Toolbar>
      </StyledAppBar>
      <Drawer open={drawer} toggle={setDrawer} />
    </>
  );
}
