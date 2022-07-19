import { useCallback } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Button, Typography } from '@mui/material';

import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

export default function BookSection() {
  const t = usePageTranslation({ keyPrefix: 'book-section' });

  const { trackEvent } = useMatomo();

  const handleCTAClick = useCallback(() => {
    console.log('TODO open contact form');
    trackEvent({ category: 'hero', action: 'contact' });
  }, [trackEvent]);

  return (
    <Section background="darker" sx={{ pt: 0 }} containerProps={{ sx: { textAlign: 'center' } }}>
      <Typography variant="h2" color="text.contrast" mb={18}>
        {t('title')}
      </Typography>
      <Button onClick={handleCTAClick}>{t('cta')}</Button>
    </Section>
  );
}
