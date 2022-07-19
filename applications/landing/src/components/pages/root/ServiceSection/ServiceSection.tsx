import { memo, useCallback } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { ArrowForwardRounded } from '@mui/icons-material';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Link from '@/components/general/Link/Link';
import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)(({ theme }) => ({
  '.LabServiceCard-root': {
    backgroundColor: theme.palette.background.dark,
    '.MuiButton-root': {
      justifyContent: 'space-between',
      padding: theme.spacing(7, 8, 6.5),
      margin: theme.spacing(2, 0, 0),
      ...theme.typography['body-sm'],
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 3,
      svg: {
        color: '#807F81',
        fontSize: '28px',
      },
    },
    '.Lab-divider': {
      ...theme.mixins.divider,
      margin: theme.spacing(0, 0, 10.5, 0),
      marginInline: theme.spacing(10),
    },
    p: {
      fontWeight: 600,
    },
  },
  '.LabServiceCard-content': {
    padding: theme.spacing(0, 8, 10.5),
  },
}));

interface ServiceCardProps {
  item: number;
  index: number;
}

const ServiceCard = memo(function ServiceCard({ /* item, */ index }: ServiceCardProps) {
  const t = usePageTranslation({ keyPrefix: 'service-section' });
  const { trackEvent } = useMatomo();

  const handleClick = useCallback(() => {
    trackEvent({ category: 'service-section', action: 'service-click' });
  }, [trackEvent]);

  return (
    <Paper square className="LabServiceCard-root">
      <Button
        component={Link}
        href="/service"
        onClick={handleClick}
        variant="text"
        fullWidth
        endIcon={<ArrowForwardRounded />}
      >
        {t(`items.${index}.title`)}
      </Button>
      <div className="LabServiceCard-content">
        <div className="Lab-divider" />
        <Typography variant="body-sm">{t(`items.${index}.description`)}</Typography>
      </div>
    </Paper>
  );
});

const items = [1, 2, 3];

export default function ServiceSection() {
  const t = usePageTranslation({ keyPrefix: 'service-section' });
  return (
    <Root background="darker">
      <Typography variant="h2" color="text.contrast" align="center" gutterBottom>
        {t('title')}
      </Typography>
      <Grid container spacing={5} mb={26}>
        <Grid item xs={12} md={6}>
          <Typography variant="body-sm">{t('description.0')}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body-sm">{t('description.0')}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        {items.map((item, itemIndex) => (
          <Grid key={itemIndex} item xs={12} md={4}>
            <ServiceCard item={item} index={itemIndex} />
          </Grid>
        ))}
      </Grid>
    </Root>
  );
}
