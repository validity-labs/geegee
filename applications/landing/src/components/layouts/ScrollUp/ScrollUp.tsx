import React, { ReactElement } from 'react';

import { useTranslation } from 'next-i18next';

import { Fab } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ScrollToTop from 'react-scroll-up';

import ArrowUpIcon from '@/components/icons/ArrowUpIcon';

const Root = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: -28,
  right: 20,
  [theme.breakpoints.up('md')]: {
    right: 0,
  },
}));

const scrollToTopStyles = { position: 'relative', right: 'auto', bottom: 'auto' };

export default function ScrollUp(): ReactElement {
  const { t } = useTranslation('common');
  const theme = useTheme();

  return (
    <Root>
      <ScrollToTop showUnder={10} style={scrollToTopStyles}>
        <Fab
          color="primary"
          aria-label={t('footer.scroll-to-top')}
          size="small"
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <ArrowUpIcon fontSize="small" />
        </Fab>
      </ScrollToTop>
    </Root>
  );
}
