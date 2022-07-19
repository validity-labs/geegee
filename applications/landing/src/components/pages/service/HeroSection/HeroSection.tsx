import { useCallback } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Hero from '@/components/layouts/Hero/Hero';
import { usePageTranslation } from '@/context/AppContext';
import coverImage from '@/public/images/pages/service/cover.jpg';

const Root = styled(Hero)(({ theme }) => ({
  '.LabHeroSection-pretitle': {
    marginBottom: theme.spacing(2.5),
    letterSpacing: 3,
    textTransform: 'uppercase',
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
    <Root coverImage={coverImage} coverImageProps={{ objectPosition: 'left' }}>
      <Typography variant="h7" component="h1" color="text.secondary" className="LabHeroSection-pretitle">
        {t('pretitle')}
      </Typography>
      <Typography variant="h1" component="h2" color="text.contrast" mb={5}>
        {t('title')}
      </Typography>
      <Typography variant="h2" component="h3" color="text.contrast" mb={12}>
        {t('description')}
      </Typography>
      <Button onClick={handleCTAClick}>{t('cta')}</Button>
    </Root>
  );
};

export default HeroSection;
