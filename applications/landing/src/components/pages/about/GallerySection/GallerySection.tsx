import Image from 'next/image';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';
import { ExternalImage } from '@/typings/app';

const ImageWrapper = styled(Box)({
  lineHeight: 0,
  '> div': {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

const ImageGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '40px',
  gridAutoRows: '315px',
  '& > div:nth-of-type(1)': {
    gridRow: 'span 2',
  },

  '& > div:nth-of-type(4)': {
    gridRow: 'span 2',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1.4fr 1.26fr 1.34fr',
    '& > div:nth-of-type(1)': {
      gridColumn: 1,
      gridRow: 'span 2',
    },
    '& > div:nth-of-type(2)': {
      gridColumn: 2,
    },
    '& > div:nth-of-type(3)': {
      gridColumn: 2,
    },
    '& > div:nth-of-type(4)': {
      gridColumn: 3,
      gridRow: '1 / span 2',
    },
  },
  img: {
    width: '100%',
    height: '100%',
  },
}));

interface Props {
  items: Pick<ExternalImage, 'url'>[];
}

export default function GallerySection({ items }: Props) {
  const t = usePageTranslation({ keyPrefix: 'gallery-section' });
  if (!items.length) {
    return null;
  }
  return (
    <Section background="darker" sx={{ pt: 0 }}>
      <ImageGrid>
        {items.map(({ url }, imageIndex) => (
          <ImageWrapper key={imageIndex}>
            <Image
              src={url}
              alt={t(`items.${imageIndex}.alt`)}
              title={t(`items.${imageIndex}.caption`)}
              width={900}
              height={imageIndex % 2 === 0 ? 1200 : 900}
              objectFit="cover"
            />
          </ImageWrapper>
        ))}
      </ImageGrid>
    </Section>
  );
}
