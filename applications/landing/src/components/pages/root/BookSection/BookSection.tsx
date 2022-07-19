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
    <Section background="lighter" containerProps={{ sx: { textAlign: 'center' } }}>
      <Typography variant="h2" mb={7}>
        {t(`title`)}
      </Typography>
      <Typography variant="body-xl" mb={15} textAlign="center">
        {t(`description`)}
      </Typography>
      <Button onClick={handleCTAClick}>{t(`cta`)}</Button>
    </Section>
  );
}
