import { memo, useCallback } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { ArrowForwardRounded } from '@mui/icons-material';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Link from '@/components/general/Link/Link';
import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)(({ theme }) => ({
  '.LabBlogCard-root': {
    backgroundColor: 'transparent',
    '.MuiButton-root': {
      justifyContent: 'space-between',
      padding: theme.spacing(4, 6, 3.5),
      ...theme.typography['body-xl'],
      fontWeight: 400,
      svg: {
        color: '#807F81',
        fontSize: '28px',
      },
    },
  },
  '.LabBlogCard-image': {
    display: 'block',
    marginBottom: theme.spacing(13),
    lineHeight: 0,
    img: {
      filter: 'none !important',
    },
  },
  '.LabBlogCard-pretitle': {
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(4.5),
  },
  '.LabBlogCard-title': {
    marginBottom: theme.spacing(5),
    ...theme.typography['body-xl'],
    fontWeight: 900,
  },
}));

interface BlogCardItem {
  url: string;
  poster: string;
}

interface BlogCardProps {
  item: BlogCardItem;
  index: number;
}

const BlogCard = memo(function BlogCard({ item, index }: BlogCardProps) {
  const { t: tRaw } = useTranslation();
  const t = usePageTranslation({ keyPrefix: 'blog-section' });
  const { url, poster } = item;
  const { trackEvent } = useMatomo();

  const handleClick = useCallback(() => {
    trackEvent({ category: 'blog-section', action: `blog-click-${url}` });
  }, [url, trackEvent]);

  return (
    <Paper square className="LabBlogCard-root">
      <div className="LabBlogCard-image">
        <Image
          src={poster}
          alt={t(`items.${index}.poster.alt`)}
          title={t(`items.${index}.poster.caption`)}
          width={374}
          height={316}
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`/images/placeholder.svg`}
        />
      </div>
      <Typography component="h3" className="LabBlogCard-pretitle">
        {t(`items.${index}.pretitle`)}
      </Typography>
      <Typography component="h4" className="LabBlogCard-title">
        {t(`items.${index}.title`)}
      </Typography>
      <Button
        component={Link}
        href={url}
        onClick={handleClick}
        variant="text"
        fullWidth
        endIcon={<ArrowForwardRounded />}
      >
        {tRaw('common.read-more')}
      </Button>
    </Paper>
  );
});

interface Props {
  items: BlogCardItem[];
}

export default function BlogSection({ items }: Props) {
  const t = usePageTranslation({ keyPrefix: 'blog-section' });
  return (
    <Root background="darker">
      <Typography variant="h2" color="text.secondary" align="center" mb={22.5}>
        {t('title')}
      </Typography>
      <Grid container spacing={8}>
        {items.map((item, itemIndex) => (
          <Grid key={itemIndex} item xs={12} md={4}>
            <BlogCard item={item} index={itemIndex} />
          </Grid>
        ))}
      </Grid>
    </Root>
  );
}
