import React /* , { useState } */ from 'react';

import { useTranslation } from 'next-i18next';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { /* Box, */ Button, Divider, IconButton, List, ListItem as MuiListItem, SwipeableDrawer, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// import Search from '../Search/Search';
import Link from '@/components/general/Link/Link';
import { headerLinks } from '@/libs/menu';
import { MenuItemGroup, MenuItemLink, SetState } from '@/typings/app';

const Content = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  color: theme.palette.text.primary,
}));

const Footer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(4),
  color: theme.palette.text.primary,
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
  ...theme.typography.h6,
  fontSize: '0.875rem', // 14px
  a: {
    padding: theme.spacing(2),
    width: '100%',
  },

}))

interface Props {
  open: boolean;
  toggle: SetState<boolean>;
}

export default function Drawer({ open, toggle }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();
  // const [searchOpen, setSearchOpen] = useState(false);
  const toggleDrawer = (flag: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    toggle(flag);
  };

  const { trackEvent } = useMatomo();

  const handleTracking = () => {
    console.log('TODO Open contact form');
    trackEvent({ category: 'drawer', action: 'contact' });
  };

  //   ...theme.typography.h6,
  // fontSize: '0.875rem', // 14px
  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          sx: {
            display: 'flex',
            width: '90%',
            backgroundColor: theme.palette.background.dark,
            '& a': {
              color: theme.palette.secondary.main,
              '&:hover': {
                color: theme.palette.primary.main,
              },
            },
          },
        }}
      >
        <Content>
          <List>
            {headerLinks.map(({ type, key, ...link }) => {
              const isURL = type === 'internal' || type === 'external';
              return (
                <React.Fragment key={key}>
                  <ListItem {...(isURL ? {} : { button: false })}>
                    <Typography
                      sx={{ color: isURL ? 'text.primary' : 'text.secondary' }}
                      {...(isURL ? { component: Link, href: (link as MenuItemLink).url } : {})}
                      onClick={toggleDrawer(false)}
                    >
                      {t(`menu.${key}.title`)}
                    </Typography>
                  </ListItem>
                  {type === 'group' && (
                    <List sx={{ ml: 6 }}>
                      {(link as MenuItemGroup).items.map(({ key: itemKey, url: itemUrl }) => (
                        <ListItem
                          key={itemKey}
                          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                        >
                          <Typography
                            component={Link}
                            href={itemUrl}
                            sx={{ color: 'text.primary', mb: 2 }}
                            onClick={toggleDrawer(false)}
                          >
                            {t(`menu.${key}.${itemKey}.title`)}
                          </Typography>
                          <Typography variant="body-sm">{t(`menu.${key}.${itemKey}.description`)}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Content>
        <Divider />
        <Footer>
          <Button
            size="small"
            // component={Link}
            onClick={handleTracking}
          // href={contactHref}
          >
            {t('header.signin')}
          </Button>
          <IconButton size="large" color="primary" aria-label={t('header.close-menu')} onClick={toggleDrawer(false)}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Footer>
      </SwipeableDrawer>
    </>
  );
}
