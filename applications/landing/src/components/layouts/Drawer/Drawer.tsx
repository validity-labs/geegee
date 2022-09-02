import React, { useCallback, useMemo } /* , { useState } */ from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// import { useMatomo } from '@datapunt/matomo-tracker-react';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { /* Box, */ Button, IconButton, List as MuiList, ListItem, SwipeableDrawer, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import AccountInfo from '../AccountInfo/AccountInfo';
// import Search from '../Search/Search';
import Link from '@/components/general/Link/Link';
import ExitIcon from '@/components/icons/ExitIcon';
import { useAccount } from '@/context/AppContext';
import { ACCOUNT_LOGIN_URL, ACCOUNT_LOGOUT_URL } from '@/libs/constants';
import { dashboardMenu, headerLinks } from '@/libs/menu';
import { MenuItemGroup, MenuItemLink, MenuItemType, SetState } from '@/typings/app';

const Root = styled(SwipeableDrawer)(({ theme }) => ({
  '.LabDrawer-content': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    color: theme.palette.text.primary,
  },
  '.LabDrawer-footer': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.primary,
  },
  '.LabDrawer-listItem': {
    ...theme.typography.h6,
    fontSize: '0.875rem', // 14px
    a: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2),
      width: '100%',
    },
  },
  '.LabDrawer-listItemIcon': {
    marginRight: theme.spacing(2),

  },
}));

interface ListProps {
  items: MenuItemType[];
  // eslint-disable-next-line no-unused-vars
  closeDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const List = ({ items, closeDrawer }: ListProps) => {
  const { t } = useTranslation();
  return (
    <MuiList>{
      items.map(({ type, key, ...link }) => {
        const isURL = type === 'internal' || type === 'external';
        const Icon = (link as MenuItemLink)?.Icon;
        return (
          <React.Fragment key={key}>
            <ListItem className="LabDrawer-listItem" {...(isURL ? {} : { button: false })}>
              <Typography
                sx={{ color: isURL ? 'text.primary' : 'text.secondary' }}
                {...(isURL ? { component: Link, href: (link as MenuItemLink).url } : {})}
                onClick={closeDrawer}
              >
                {Icon && <Icon className="LabDrawer-listItemIcon" />}
                <span>{t(`menu.${key}.title`)}</span>
              </Typography>
            </ListItem>
            {type === 'group' && (
              <MuiList sx={{ ml: 6 }}>
                {(link as MenuItemGroup).items.map(({ key: itemKey, url: itemUrl }) => (
                  <ListItem
                    className="LabDrawer-listItem"
                    key={itemKey}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                  >
                    <Typography
                      component={Link}
                      href={itemUrl}
                      sx={{ color: 'text.primary', mb: 2 }}
                      onClick={closeDrawer}
                    >
                      {t(`menu.${key}.${itemKey}.title`)}
                    </Typography>
                    <Typography variant="body-sm">{t(`menu.${key}.${itemKey}.description`)}</Typography>
                  </ListItem>
                ))}
              </MuiList>
            )}
          </React.Fragment>
        );
      })
    }</MuiList>
  )
}

interface Props {
  open: boolean;
  toggle: SetState<boolean>;
}

export default function Drawer({ open, toggle }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();


  const { pathname } = useRouter();
  const isUserArea = pathname.indexOf('/account/') !== -1;

  const { isOnline } = useAccount();

  // const [searchOpen, setSearchOpen] = useState(false);
  const toggleDrawer = useCallback((flag: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    toggle(flag);
  }, [toggle]);

  const closeDrawer = useMemo(() => {
    return toggleDrawer(false);
  }, [toggleDrawer]);
  // const { trackEvent } = useMatomo();

  // const handleTracking = () => {
  //   console.log('TODO Open contact form');
  //   trackEvent({ category: 'drawer', action: 'contact' });
  // };

  //   ...theme.typography.h6,
  // fontSize: '0.875rem', // 14px
  return (
    <Root
      anchor="left"
      open={open}
      onClose={closeDrawer}
      onOpen={toggleDrawer(true)}
      PaperProps={{
        sx: {
          display: 'flex',
          width: '90%',
          backgroundColor: theme.palette.background.main,
          '& a': {
            color: theme.palette.secondary.main,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          },
        },
      }}
    >
      <div className="LabDrawer-content Lab-divider">
        {isOnline && <List items={dashboardMenu} closeDrawer={closeDrawer} />}
        <List items={headerLinks.filter(f => !isOnline || f.key !== 'platform')} closeDrawer={closeDrawer} />
      </div>
      <div className="LabDrawer-footer">
        {isOnline && <AccountInfo />}
        <div>
          {!isUserArea && (
            <>{isOnline ? (
              <IconButton size="large" aria-label={t('header.logout')} component="a"
                href={ACCOUNT_LOGOUT_URL} onClick={toggleDrawer(false)}>
                <ExitIcon fontSize="large" />
              </IconButton>
            ) : (
              <Button
                component="a"
                href={ACCOUNT_LOGIN_URL}
                size="small"
                className="LabHeader-signin"
              >
                {t('header.signin')}
              </Button>
            )}
            </>
          )}
          <IconButton size="large" color="secondary" aria-label={t('header.close-menu')} onClick={toggleDrawer(false)}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </Root>
  );
}
