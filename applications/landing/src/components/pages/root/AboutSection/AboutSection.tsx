import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Card from './Card';
import Decoration from './Decoration';
import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)(({ theme }) => ({
  marginTop: theme.spacing(42),
  paddingTop: theme.spacing(30),
  position: 'relative',
  '.LabAboutSection-title': {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    height: '2.6em',
    margin: theme.spacing(0, 0, 35),
    paddingRight: theme.spacing(20),
  },
  '.LabAboutSection-cards': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(11),
  },
  '.LabAboutSection-card2': {
    '& .LabAboutSectionCard-wrapper:after': {
      top: 'initial',
      right: 'initial',
      bottom: 34,
      left: 0,
      transform: 'translateX(-50%)',
    },
  },
  '.LabAboutSection-card3': {
    '& .LabAboutSectionCard-wrapper:after': {
      top: 54,
    },
  },
  '.LabAboutSection-description': {
    maxWidth: 420,
    color: theme.palette.text.secondary,
  },
  [theme.breakpoints.up("md")]: {
    '.LabAboutSection-title': {
      margin: theme.spacing(25, 0, 30),
      paddingRight: theme.spacing(20),
    },
    '.LabAboutSection-card1': {
      marginLeft: theme.spacing(13),
    },
    '.LabAboutSection-card2': {
      margin: '0 0 0 auto',
    },
    '.LabAboutSection-card3': {
      margin: '0 auto 0 0',
    },
  },
}));


const items = [1, 2, 3];

const AboutSection = () => {
  const t = usePageTranslation({ keyPrefix: 'about-section' });

  return (
    <Root background='transparent' before={<Decoration />}>
      <Grid container spacing={15}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" className="LabAboutSection-title">{t('title')}</Typography>
          <Typography variant="h6" component="p" className="LabAboutSection-description">{t('description')}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="LabAboutSection-cards">
            {items.map((_item, itemIndex) =>
              <Card key={itemIndex} i18nKey={`about-section.items.${itemIndex}`} className={`LabAboutSection-card${itemIndex + 1}`} />,
            )}
          </div>
        </Grid>
      </Grid>
    </Root>
  );
};

export default AboutSection;
