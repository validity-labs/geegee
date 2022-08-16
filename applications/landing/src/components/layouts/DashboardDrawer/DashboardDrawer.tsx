import { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { CSSObject, styled, Theme } from '@mui/material/styles';

import Link from '@/components/general/Link/Link';
import ExitIcon from '@/components/icons/ExitIcon';
import { ACCOUNT_LOGOUT_URL } from '@/libs/constants';
import { dashboardMenu } from '@/libs/menu';

const expandedWidth = 241;
const compactWidth = 91;

const widthTransition = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});
const openedMixin = (theme: Theme): CSSObject => ({
  width: expandedWidth,
  overflowX: 'hidden',
  ...widthTransition(theme),
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: compactWidth,
  overflowX: 'hidden',
  ...widthTransition(theme),
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
});


const Root = styled('nav', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean; }>(({ theme, expanded }) => ({
  display: 'none',
  width: expanded ? expandedWidth : compactWidth,
  height: '100%',
  ...widthTransition(theme),
  [theme.breakpoints.up('md')]: {
    display: 'initial',
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean; }>(({ theme, expanded }) => ({

  // zIndex: 9999,
  width: expandedWidth,
  flexShrink: 0,
  // whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  overflow: 'hidden',
  '.MuiDrawer-paper': {
    maxWidth: expandedWidth,
    borderRight: `1px solid #282732`,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  ...(expanded && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!expanded && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': { ...closedMixin(theme) },
  }),

  '.LabDashboardDrawer-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    width: expandedWidth,
    height: '100%',
    overflow: 'auto',
  },
  '.LabDashboardDrawer-header': {
    position: 'absolute',
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  '.LabDashboardDrawer-content': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(20, 0),
  },
  '.LabDashboardDrawer-button': {
    justifyContent: 'flex-start',
    padding: theme.spacing(2, 5, 2, 6),
    fontWeight: 500,
    textAlign: 'left',
    '.MuiButton-startIcon': {
      padding: theme.spacing(3),
      borderRadius: +theme.shape.borderRadius * 3,
      color: '#676878',
    },
    '&.active, &:hover': {
      '.MuiButton-startIcon': {
        backgroundColor: 'rgba(255,255,255, 0.08)',
      },
    },
  },
  [theme.breakpoints.up("md")]: {},
}));


export default function DashboardDrawer() {
  const { t } = useTranslation();
  const [expand, setExpand] = useState({ hover: false, persistent: false });


  const handleHoverEnter = useCallback(() => {
    setExpand(prevExpand => ({ ...prevExpand, hover: true }))
  }, []);

  const handleHoverLeave = useCallback(() => {
    setExpand(prevExpand => ({ ...prevExpand, hover: false }))
  }, []);

  const handleToggle = useCallback(() => {
    setExpand(prevExpand => ({ ...prevExpand, persistent: !prevExpand.persistent }))
  }, []);

  const isExpanded = expand.persistent || expand.hover;
  return (
    <Root expanded={isExpanded}>
      <Drawer variant="permanent" expanded={isExpanded}>
        <div className="LabDashboardDrawer-wrapper">
          <div className="LabDashboardDrawer-header">
            <IconButton onClick={handleToggle} color="secondary" >
              {!isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <div className="LabDashboardDrawer-content">
            <ul>
              {dashboardMenu.map(({ key, url, Icon }) => (
                <li key={key}>
                  <Button
                    variant="text"
                    fullWidth
                    className="LabDashboardDrawer-button"
                    component={Link}
                    href={url}
                    startIcon={<Icon />}
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
                  >
                    {t(`menu.${key}.title`)}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Button
              variant="text"
              fullWidth
              className="LabDashboardDrawer-button"
              component={Link}
              href={ACCOUNT_LOGOUT_URL}
              startIcon={<ExitIcon />}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </Drawer>
    </Root>
  );
}
