import { memo } from 'react';

import Image from 'next/image';

import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)(({ theme }) => ({
  paddingTop: theme.spacing(30),
  '.LabBenefitSection-pretitle': {
    margin: theme.spacing(0, 0, 6),
    fontWeight: 600,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  '.LabBenefitCard-root': {
    backgroundColor: 'transparent',
  },
  '.LabBenefitCard-title': {
    margin: theme.spacing(0, 0, 6),
    ...theme.mixins.font.title,
    fontWeight: 900,
    color: theme.palette.text.secondary,
  },
  '.LabBenefitCard-image': {
    margin: theme.spacing(0, 0, 6),
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
    <div className="LabBenefitCard-root">
      <div className="LabBenefitCard-image">
        <Image
          src={`/images/pages/service/benefit/${item}`}
          alt=""
          width={60}
          height={60}
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
    </div>
  );
});

interface Props {
  items: string[];
}

export default function BenefitSection({ items }: Props) {
  const t = usePageTranslation({ keyPrefix: 'benefit-section' });
  return (
    <Root background="lighter">
      <Grid container columnSpacing={10}>
        <Grid item xs={12} md={4}>
          <Typography variant="body-xs" component="h2" className="LabBenefitSection-pretitle">
            {t('pretitle')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" component="h3" mb={11}>
            {t('title')}
          </Typography>
          <Typography variant="body-sm" mb={27}>
            {t('description')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8}>
          <Grid container columnSpacing={29} rowSpacing={27}>
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
