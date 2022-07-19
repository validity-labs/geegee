import { Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { usePageTranslation } from '@/context/AppContext';

const Root = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  '.LabInfoSection-content': {
    flexBasis: '100%',
    '> .MuiContainer-root': {
      paddingRight: 0,
    },
  },
  '.LabInfoSection-contentPanel': {
    padding: theme.spacing(17, 5, 28),
  },
  '&, .LabInfoSection-before': {
    backgroundColor: theme.palette.background.darker,
  },
  '.LabInfoSection-before, .LabInfoSection-after': {
    flexGrow: 1,
  },
  '.LabInfoSection-contentPanel, .LabInfoSection-after': {
    transform: 'translateY(-130px)',
    backgroundColor: theme.palette.background.lighter,
  },
  '.LabBenefitSection-itemTitle': {
    margin: theme.spacing(0, 0, 6),
    ...theme.mixins.font.title,
    fontWeight: 900,
    color: theme.palette.text.secondary,
  },
  [theme.breakpoints.up('md')]: {
    '.LabInfoSection-contentPanel': {
      padding: theme.spacing(17, 25, 28),
    },
  },
}));

const items = [1, 2, 3];

export default function InfoSection() {
  const t = usePageTranslation({ keyPrefix: 'info-section' });
  return (
    <Root>
      <div className="LabInfoSection-before" />
      <Container className="LabInfoSection-content" disableGutters>
        <Container>
          <div className="LabInfoSection-contentPanel">
            <Typography variant="h2" mb={12.5}>
              {t('title')}
            </Typography>
            <Grid container spacing={12}>
              {items.map((_item, itemIndex) => (
                <Grid key={itemIndex} item xs={12} md={4}>
                  <Typography variant="h5" component="h3" className="LabBenefitSection-itemTitle">
                    {t(`items.${itemIndex}.title`)}
                  </Typography>
                  <Typography variant="body-xs" fontWeight={600}>
                    {t(`items.${itemIndex}.description`)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </Container>
      <div className="LabInfoSection-after" />
    </Root>
  );
}
