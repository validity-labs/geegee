import { useCallback } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { ArrowForwardRounded } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Link from '@/components/general/Link/Link';
import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';
import memberImage from '@/public/images/pages/landing/member.jpg';

const Root = styled(Section)(({ theme }) => ({
  '.LabTeamSection-title': {
    margin: theme.spacing(0, 0, 25),
  },
  '.LabTeamSection-subTitle': {
    fontWeight: 600,
    margin: theme.spacing(0, 0, 45),
  },
  '.LabTeamSection-image': {
    display: 'inline-block',
    transform: 'translateY(-50%)',
    '> div': {
      borderRadius: '100%',
      overflow: 'hidden',
    },
    img: {
      filter: 'none !important',
    },
  },
  '.LabTeamSection-description': {
    margin: theme.spacing('-119px', 0, 8),
  },
  '.LabTeamSection-more': {
    justifyContent: 'space-between',
  },
  [theme.breakpoints.up('md')]: {
    '.LabTeamSection-subTitle': {
      fontWeight: 600,
      margin: theme.spacing(0, 0, 5),
    },
    '.LabTeamSection-description': {
      margin: theme.spacing(8, 0),
    },
  },
}));

export default function TeamSection() {
  const { trackEvent } = useMatomo();
  const { t: tRaw } = useTranslation();
  const t = usePageTranslation({ keyPrefix: 'team-section' });
  const handleClick = useCallback(() => {
    trackEvent({ category: 'team-section', action: `team-click-about` });
  }, [trackEvent]);

  return (
    <>
      <Root
        background="lighter"
        containerProps={{
          maxWidth: 'md',
        }}
        sx={{ paddingBottom: 0 }}
      >
        <Typography variant="h2" align="center" className="LabTeamSection-title">
          {t('title')}
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" className="LabTeamSection-subTitle">
              {t('member.title')}
            </Typography>
          </Grid>
        </Grid>
      </Root>
      <Root
        background="darker"
        containerProps={{
          maxWidth: 'md',
        }}
        sx={{ paddingTop: 0, paddingBottom: 10 }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} md={4} textAlign="center">
            <div className="LabTeamSection-image">
              <Image
                src={memberImage}
                alt={t('member.photo.alt')}
                title={t('member.photo.caption')}
                width={238}
                height={238}
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`/images/placeholder.svg`}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="body-sm" className="LabTeamSection-description">
              {t('member.description')}
            </Typography>
            <Button
              component={Link}
              href="/about"
              fullWidth
              onClick={handleClick}
              variant="text"
              endIcon={<ArrowForwardRounded />}
              size="small"
              className="LabTeamSection-more"
            >
              {tRaw('common:common.more')}
            </Button>
          </Grid>
        </Grid>
      </Root>
    </>
  );
}
