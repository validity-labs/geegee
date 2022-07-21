import { useCallback } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import CardsSection from './cards/CardsSection';
import InfluencerSection from './influencer/InfluencerSection';
import Hero from '@/components/layouts/Hero/Hero';
import { usePageTranslation } from '@/context/AppContext';
import coverImage from '@/public/images/cover.png';

const Root = styled(Hero)(({ theme }) => ({
  textAlign: 'center',
  '.LabHeroSection-pretitle': {
    marginBottom: theme.spacing(10),
    textTransform: 'uppercase',
  },
  '.LabHeroSection-title': {
    marginBottom: theme.spacing(10),
  },
  '.LabHeroSection-cta': {
    borderWidth: 2,
    maxWidth: 388,
    width: '100%',
    '&:hover': {
      borderWidth: 2,
    },
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
      <Typography variant="h4" component="h1" color="primary" className="LabHeroSection-pretitle">
        {t('pretitle')}
      </Typography>
      <Typography variant="h1" component="h2" className="LabHeroSection-title">
        {t('title')}
      </Typography>
      <Button
        size="small"
        className="LabHeroSection-cta"
        endIcon={<ArrowForwardIcon style={{ color: theme.palette.primary.main }} />}
        onClick={handleCTAClick}
      >
        {t('cta')}
      </Button>
      <InfluencerSection />
      <CardsSection />
    </Root>
  );
};

export default HeroSection;
