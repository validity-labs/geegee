import { memo } from 'react';

import Image from 'next/image';

import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)(({ theme }) => ({
  paddingTop: theme.spacing(30),
  '.LabBenefitSection-pretitle': {
    margin: theme.spacing(0, 0, 6),
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  '.LabBenefitCard-root': {
    padding: theme.spacing(18, 8, 21),
    backgroundColor: theme.palette.background.dark,
  },
  '.LabBenefitCard-title': {
    margin: theme.spacing(0, 0, 6),
    ...theme.mixins.font.title,
    fontWeight: 900,
    color: theme.palette.text.secondary,
  },
  '.LabBenefitCard-image': {
    margin: theme.spacing(0, 0, 14),
    lineHeight: 0,
    img: {
      filter: 'none !important',
    },
  },
}));

interface BenefitCardProps {
  item: string;
  index: number;
}

const BenefitCard = memo(function BenefitCard({ item, index }: BenefitCardProps) {
  const t = usePageTranslation({ keyPrefix: 'benefit-section' });
  return (
    <Paper square className="LabBenefitCard-root">
      <div className="LabBenefitCard-image">
        <Image
          src={`/images/pages/landing/benefit/${item}`}
          alt=""
          width={45}
          height={45}
          objectFit="contain"
          placeholder="blur"
          blurDataURL={`/images/placeholder.svg`}
        />
      </div>
      <Typography variant="h5" component="h4" className="LabBenefitCard-title">
        {t(`items.${index}.title`)}
      </Typography>
      <Typography variant="body-xs" fontWeight={600}>
        {t(`items.${index}.description`)}
      </Typography>
    </Paper>
  );
});

const items = ['benefit1.svg', 'benefit2.svg', 'benefit3.svg', 'benefit4.svg'];

export default function BenefitSection() {
  const t = usePageTranslation({ keyPrefix: 'benefit-section' });
  return (
    <Root background="darker">
      <Grid container spacing={10}>
        <Grid item xs={12} md={5}>
          <Typography component="h2" className="LabBenefitSection-pretitle">
            {t('pretitle')}
          </Typography>
          <Typography variant="h2" component="h3" color="text.secondary">
            {t('title')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container columnSpacing={11} rowSpacing={9}>
            {items.map((item, itemIndex) => (
              <Grid key={itemIndex} item xs={12} md={6}>
                <BenefitCard item={item} index={itemIndex} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Root>
  );
}
