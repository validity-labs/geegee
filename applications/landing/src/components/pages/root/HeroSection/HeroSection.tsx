import { useCallback } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import Hero from '@/components/layouts/Hero/Hero';
import { usePageTranslation } from '@/context/AppContext';
import coverImage from '@/public/images/cover.png';

const Root = styled(Hero)(({ theme }) => ({
  textAlign: 'center',
  '.LabHeroSection-pretitle': {
    marginBottom: theme.spacing(2.5),
    textTransform: 'uppercase',
  },
  '.LabHeroSection-title': {
    marginBottom: theme.spacing(10),
  },
}));

const HeroSection = () => {
  const theme = useTheme();

  const t = usePageTranslation({ keyPrefix: 'hero-section' });
  const { trackEvent } = useMatomo();

  const handleCTAClick = useCallback(() => {
    console.log('TODO open contact form');
    trackEvent({ category: 'hero', action: 'contact' });
  }, [trackEvent]);

  return (
    <Root coverImage={coverImage}>
      <Typography variant="h7" component="h1" color="primary" className="LabHeroSection-pretitle">
        {t('pretitle')}
      </Typography>
      <Typography variant="h1" component="h2" color="text.contrast" className="LabHeroSection-title">
        {t('title')}
      </Typography>
      <Button
        size="small"
        sx={{ fontWeight: 600, width: 388, justifyContent: 'space-between' }}
        endIcon={<ArrowForwardIcon style={{ color: theme.palette.primary.main }} />}
        onClick={handleCTAClick}
      >
        {t('cta')}
      </Button>
    </Root>
  );
};

export default HeroSection;
