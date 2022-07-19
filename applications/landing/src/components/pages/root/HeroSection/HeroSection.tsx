import { useCallback } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Hero from '@/components/layouts/Hero/Hero';
import { usePageTranslation } from '@/context/AppContext';
import coverImage from '@/public/images/pages/landing/cover.jpg';

const Root = styled(Hero)(({ theme }) => ({
  '.LabHeroSection-pretitle': {
    marginBottom: theme.spacing(2.5),
    textTransform: 'uppercase',
  },
  '.LabHeroSection-title': {
    marginBottom: theme.spacing(10),
  },
}));

const HeroSection = () => {
  const t = usePageTranslation({ keyPrefix: 'hero-section' });
  const { trackEvent } = useMatomo();

  const handleCTAClick = useCallback(() => {
    console.log('TODO open contact form');
    trackEvent({ category: 'hero', action: 'contact' });
  }, [trackEvent]);

  return (
    <Root coverImage={coverImage}>
      <Typography variant="h7" component="h1" color="text.contrast" className="LabHeroSection-pretitle">
        {t('pretitle')}
      </Typography>
      <Typography variant="h1" component="h2" color="text.contrast" className="LabHeroSection-title">
        {t('title')}
      </Typography>
      <Button onClick={handleCTAClick}>{t('cta')}</Button>
    </Root>
  );
};

export default HeroSection;
