import * as React from 'react';

import Image from 'next/image';

import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import RichContent from '@/components/general/RichContent/RichContent';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Box)(({ theme }) => ({
  '.LabQuoteCard-image': {
    position: 'relative',
    display: 'inline-block',
    lineHeight: 0,
    img: {
      borderRadius: '100%',
      overflow: 'hidden',
      filter: 'none !important',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: '-30%',
      right: '-35%',
      width: 106,
      height: 68,
      background: 'url(/images/quote.svg) no-repeat center / 106px 68px',
      zIndex: 2,
    },
  },
  '.LabQuoteCard-content': {
    p: {
      marginBottom: theme.spacing(5),
      ...theme.typography['body-xl'],
      fontWeight: 900,
    },
  },
  [theme.breakpoints.up('md')]: {},
}));

interface Props {
  item: string;
  index: number;
}

export default function QuoteCard({ item: imageUrl, index }: Props) {
  const t = usePageTranslation({ keyPrefix: 'quote-section' });
  return (
    <Root>
      <Grid container columnSpacing={9} rowSpacing={20}>
        <Grid item xs={12} md={4} textAlign="center">
          <div className="LabQuoteCard-image">
            <Image
              src={imageUrl}
              alt={t(`items.${index}.photo.alt`)}
              title={t(`items.${index}.photo.caption`)}
              width={112}
              height={112}
              /* 5:4 */ objectFit="cover"
              placeholder="blur"
              blurDataURL={`/images/placeholder.svg`}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <RichContent dangerousHtml={`<p>${t(`items.${index}.quote`)}</p>`} className="LabQuoteCard-content" />
          <Typography mb={3}>{`${t(`items.${index}.name`)} / ${t(`items.${index}.position`)}`}</Typography>
        </Grid>
      </Grid>
    </Root>
  );
}
