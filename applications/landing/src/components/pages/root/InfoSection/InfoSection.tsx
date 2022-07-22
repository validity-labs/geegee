import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/system';

import Link from '@/components/general/Link/Link';
import DiscordIcon from '@/components/icons/DiscordIcon';
import DocsIcon from '@/components/icons/DocsIcon';
import NextIcon from '@/components/icons/NextIcon';
import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)(({ theme }) => ({
  '.LabInfoSection-title': {
    marginBottom: theme.spacing(3),
    fontSize: '1.5625rem', // 25px
    lineHeight: '2rem', // 32px
  },
  '.LabInfoSection-panel': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(13, 10.5),
    border: `1px solid ${theme.palette.secondary.main}`,
    ...theme.mixins.radius(4),
  },
  '.LabInfoSection-signup': {
    borderWidth: 2,
    color: '#8b8d97',
    '&:hover': {
      borderWidth: 2,
    },
  },
  '.LabInfoSection-actions': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(6),
    marginTop: theme.spacing(6),
    a: {
      maxWidth: 370,
      width: '100%',
      color: '#8b8d97',
    },
  },
  '.LabInfoSection-community': {
    borderColor: '#8900FF',
    '&:hover': {
      color: '#8900FF',
      backgroundColor: alpha('#8900FF', .1),
    },
  },
  [theme.breakpoints.up("md")]: {
    '.LabInfoSection-panel': {
      minHeight: 400,
    },
    '.LabInfoSection-title': {
      fontSize: '2.5rem', // 40px
      lineHeight: '3.1875rem', // 51px
    },
  },
}));

const InfoSection = () => {
  const t = usePageTranslation({ keyPrefix: 'info-section' });

  return (
    <Root background='transparent'>
      <Grid container spacing={4.5}>
        <Grid item xs={12} md={8}>
          <div className="LabInfoSection-panel">
            <div>
              <Typography variant="h2" className="LabInfoSection-title" >{t('title')}</Typography>
              <Typography variant="body-xl" mb={9}>{t('description')}</Typography>
              <Button variant="outlined" component={Link} href="/sign-up" className="LabInfoSection-signup" size="small" endIcon={<NextIcon htmlColor="#f631f6" />} >{t('sign-up')}</Button>
            </div></div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="LabInfoSection-panel">
            <Typography variant="h6" component="h3" mb={4.5}>{t('more.title')}</Typography>
            <Typography variant="body-sm" mb={{ md: 10.5 }}>{t('more.description')}</Typography>

          </div>
        </Grid>
      </Grid>
      <div className="LabInfoSection-actions">
        <Button variant="outlined" component={Link} href="/docs" size="small" endIcon={<DocsIcon htmlColor="#f631f6" />}>{t('read-docs')}</Button>
        <Button variant="outlined" component={Link} href="/join-community" className="LabInfoSection-community" size="small" endIcon={<DiscordIcon htmlColor="#8900ff" />}>{t('join-community')}</Button>
      </div>
    </Root>
  );
};

export default InfoSection;
