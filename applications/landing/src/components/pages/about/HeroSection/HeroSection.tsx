import { Typography } from '@mui/material';

import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const HeroSection = () => {
  const t = usePageTranslation({ keyPrefix: 'hero-section' });
  return (
    <Section background="darker" sx={{ pb: 40, textAlign: 'center' }}>
      <Typography variant="h1" color="text.contrast" mb={5}>
        {t('pretitle')}
      </Typography>
      <Typography variant="h2" color="text.contrast">
        {t('title')}
      </Typography>
    </Section>
  );
};

export default HeroSection;
