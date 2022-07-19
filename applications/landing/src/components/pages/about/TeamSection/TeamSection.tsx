import { useCallback, useState } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { Box, Button, Collapse, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)({
  '.LabTeamSection-pretitle': {
    fontWeight: 600,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  '.LabTeamSection-image': {
    display: 'inline-block',
    '> div': {
      borderRadius: '100%',
      overflow: 'hidden',
    },
    img: {
      filter: 'none !important',
    },
  },
});

interface TeamItemProps {
  item: {
    url: string;
  };
  index: number;
}

const TeamItem = ({ item, index }: TeamItemProps) => {
  const { t: tRaw } = useTranslation();
  const t = usePageTranslation({ keyPrefix: 'team-section' });

  const [isVisible, setIsVisible] = useState(false);

  const handleCollapse = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, [setIsVisible]);

  const title = `${t(`items.${index}.name`)} | ${t(`items.${index}.title`)}`;

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={3} textAlign="center">
        <div className="LabTeamSection-image">
          <Image
            src={item.url}
            alt={t(`items.${index}.photo.alt`)}
            title={title}
            width={238}
            height={238}
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`/images/placeholder.svg`}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={9}>
        <Typography variant="body-xs" component="h3" fontWeight={600} mb={6}>
          {title}
        </Typography>
        <Typography variant="body-sm" fontWeight={600}>
          {t(`items.${index}.bio`)}
        </Typography>
        <Box textAlign="end" mb={6}>
          <Button variant="text" size="small" onClick={handleCollapse}>
            {tRaw(`common:common.read-${isVisible ? 'less' : 'more'}`)}
          </Button>
        </Box>
        <Collapse in={isVisible}>
          <Typography variant="body-sm">{t(`items.${index}.description`)}</Typography>
        </Collapse>
      </Grid>
    </Grid>
  );
};

interface Props {
  items: { url: string }[];
}
export default function TeamSection({ items }: Props) {
  const t = usePageTranslation({ keyPrefix: 'team-section' });

  return (
    <Root background="lighter">
      <Grid container spacing={10}>
        <Grid item xs={12} md={1}>
          <Typography variant="body-xs" component="h2" className="LabTeamSection-pretitle">
            {t('title')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={11}>
          {items.map((item, itemIndex) => (
            <TeamItem key={itemIndex} item={item} index={itemIndex} />
          ))}
        </Grid>
      </Grid>
    </Root>
  );
}
