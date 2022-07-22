import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { usePageTranslation } from '@/context/AppContext';

const CardsSection = () => {
  const theme = useTheme();
  const t = usePageTranslation({ keyPrefix: 'cards-section' });

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      spacing={0}
      sx={{ mt: 10, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
    >
      <Box sx={{ border: `1px solid ${theme.palette.primary.main}`, p: 10, m: 10, borderRadius: 4 }}>
        <Typography variant="h4" component="h3" color="primary" sx={{ mb: 5 }}>
          {t('heading1')}
        </Typography>
        <Typography variant="body" color="secondary">
          {t('content1')}
        </Typography>
      </Box>
      <Box sx={{ p: 10, m: 10, borderRadius: 4, background: `linear-gradient(rgba(0,0,0, 0) 0%, rgba(246,49,246, 1) 200%)` }}>
        <Typography variant="h4" component="h3" color="primary" sx={{ mb: 5 }}>
          {t('heading2')}
        </Typography>
        <Typography variant="body" color="secondary">
          {t('content2')}
        </Typography>
      </Box>
      <Box sx={{ border: `1px solid ${theme.palette.primary.main}`, p: 10, m: 10, borderRadius: 4 }}>
        <Typography variant="h4" component="h3" color="primary" sx={{ mb: 5 }}>
          {t('heading3')}
        </Typography>
        <Typography variant="body" color="secondary">
          {t('content3')}
        </Typography>
      </Box>
    </Stack>
  );
};

export default CardsSection;
