import * as React from 'react';

import { useTranslation } from 'next-i18next';

import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Link from '@/components/general/Link/Link';
import PreviousIcon from '@/components/icons/PreviousIcon';
import Hero from '@/components/layouts/Hero/Hero';

interface Props {
  statusCode?: number;
}
const HeroSection = ({ statusCode }: Props) => {
  const { t } = useTranslation('error');
  const theme = useTheme();

  return (
    <Hero>
      <Grid container sx={{ pt: 5, pb: 1.5 }}>
        <Grid item>
          <Typography component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center', mb: 5.5 }}>
            <PreviousIcon sx={{ mr: 4 }} /> {t('hero-section.back')}
          </Typography>
          <Typography variant="h1" sx={{ color: theme.palette.secondary.main }}>
            {statusCode ? t('hero-section.title-server', { statusCode }) : t('hero-section.title-client')}
          </Typography>
        </Grid>
      </Grid>
    </Hero>
  );
};

export default HeroSection;
