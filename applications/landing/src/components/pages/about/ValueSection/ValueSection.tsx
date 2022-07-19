import { memo } from 'react';

import Image from 'next/image';

import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)(({ theme }) => ({
  paddingTop: theme.spacing(30),
  '.LabValueSection-pretitle': {
    margin: theme.spacing(0, 0, 6),
    fontWeight: 600,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  '.LabValueCard-root': {
    padding: theme.spacing(11, 0, 0),
    backgroundColor: theme.palette.background.darker,
    '&.Lab-n4': {
      '.LabValueCard-description': {
        borderBottomColor: 'transparent',
      },
    },
  },
  '.LabValueCard-pretitle': {
    margin: theme.spacing(0, 0, 13),
    ...theme.mixins.font.title,
    fontWeight: 900,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
  },
  '.LabValueCard-title': {
    margin: theme.spacing(0, 0, 4),
    ...theme.mixins.font.title,
    fontSize: '2.5rem' /* 40px */,
    fontWeight: 900,
    color: theme.palette.text.contrast,
  },
  '.LabValueCard-description': {
    paddingBottom: theme.spacing(20),
    ...theme.mixins.divider,
    fontWeight: 600,
  },
  '.LabValueSection-image': {
    paddingTop: theme.spacing(19),
  },
  [theme.breakpoints.up('md')]: {
    '.LabValueCard-root': {
      '&.Lab-n3, &.Lab-n4': {
        '.LabValueCard-description': {
          borderColor: 'transparent',
        },
      },
    },
  },
}));

interface ValueCardProps {
  item: number;
  index: number;
}

const ValueCard = memo(function ValueCard({ index }: ValueCardProps) {
  const t = usePageTranslation({ keyPrefix: 'value-section' });
  return (
    <Paper square className={`LabValueCard-root Lab-n${index + 1}`}>
      <Typography variant="h7" component="h4" className="LabValueCard-pretitle">
        {t(`items.${index}.pretitle`)}
      </Typography>
      <Typography variant="h2" component="h5" className="LabValueCard-title">
        {t(`items.${index}.title`)}
      </Typography>
      <Typography variant="body-xs" className="LabValueCard-description">
        {t(`items.${index}.description`)}
      </Typography>
    </Paper>
  );
});

interface Props {
  items: number[];
}

export default function ValueSection({ items }: Props) {
  const t = usePageTranslation({ keyPrefix: 'value-section' });
  return (
    <Root background="darker">
      <Grid container columnSpacing={10}>
        <Grid item xs={12} md={4}>
          <Typography variant="body-xs" component="h2" className="LabValueSection-pretitle">
            {t('pretitle')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" component="h3" color="text.contrast" mb={32}>
            {t('title')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8}>
          <Grid container columnSpacing={18} rowSpacing={10}>
            {items.map((item, itemIndex) => (
              <Grid key={itemIndex} item xs={12} md={6}>
                <ValueCard item={item} index={itemIndex} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className="LabValueSection-image">
            <Image
              src="/images/pages/about/value.jpg"
              alt=""
              width={1180}
              height={657}
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`/images/placeholder.svg`}
            />
          </div>
        </Grid>
      </Grid>
    </Root>
  );
}
