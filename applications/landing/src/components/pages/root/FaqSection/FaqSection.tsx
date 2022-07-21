import { useCallback } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Accordion, AccordionDetails, AccordionSummary, Button, ExpandMoreIcon, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { usePageTranslation } from '@/context/AppContext';

const FaqSection = () => {
  const theme = useTheme();

  const t = usePageTranslation({ keyPrefix: 'hero-section' });
  const { trackEvent } = useMatomo();

  const handleCTAClick = useCallback(() => {
    console.log('TODO open contact form');
    trackEvent({ category: 'hero', action: 'contact' });
  }, [trackEvent]);

  return (
    <>
      <Typography variant="h7" component="h1" color="primary" className="LabHeroSection-pretitle">
        FAQ
        {/* {t('pretitle')} */}
      </Typography>
    </>
  );
};

export default FaqSection;
