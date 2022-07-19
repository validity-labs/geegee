import React /* , { useState } */ from 'react';

import { useTranslation } from 'next-i18next';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { /* Box, */ Button, Divider, IconButton, List, ListItem, SwipeableDrawer, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// import Search from '../Search/Search';
import Link from '@/components/general/Link/Link';
import SendIcon from '@/components/icons/SendIcon';
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

interface Props {
  open: boolean;
  toggle: SetState<boolean>;
}

export default function Drawer({ open, toggle }: Props) {
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
                      sx={{ fontSize: '1rem', color: isURL ? 'text.primary' : 'text.secondary' }}
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
                          button
                          key={itemKey}
                          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                        >
                          <Typography
                            component={Link}
                            href={itemUrl}
                            sx={{ fontSize: '1rem', color: 'text.primary', mb: 2 }}
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
          {/* <Box sx={{ position: 'relative', mx: 4, my: 8 }}>
            <Search open={searchOpen} setOpen={setSearchOpen} isDark />
          </Box> */}
        </Content>
        <Divider />
        <Footer>
          <Button
            variant="containedIcon"
            color="secondary"
            // component={Link}
            onClick={handleTracking}
            // href={contactHref}
            sx={{ fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}
            endIcon={<SendIcon fontSize="large" />}
          >
            {t('header.contact')}
          </Button>
          <IconButton size="large" color="inherit" aria-label={t('header.close-menu')} onClick={toggleDrawer(false)}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Footer>
      </SwipeableDrawer>
    </>
  );
}
