import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  '.LabValueSection-pretitle': {
    margin: theme.spacing(0, 0, 6),
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
}));

export default function ApproachSection() {
  const t = usePageTranslation({ keyPrefix: 'approach-section' });
  return (
    <Root background="darker">
      <Grid container columnSpacing={10}>
        <Grid item xs={12} md={4}>
          <Typography variant="body-md" component="h2" className="LabValueSection-pretitle">
            {t('pretitle')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" component="h3" color="text.contrast" mb={16}>
            {t('title')}
          </Typography>
          <Typography variant="body-sm">{t('description')}</Typography>
        </Grid>
      </Grid>
    </Root>
  );
}
