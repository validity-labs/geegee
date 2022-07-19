import { useState } from 'react';

import NextImage from 'next/image';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { ArrowForwardOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
/* @ts-ignore */
import { A11y, Navigation, Swiper, Thumbs } from 'swiper';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import QuoteCard from '@/components/cards/QuoteCard/QuoteCard';
import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Thumb = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  paddingBottom: theme.spacing(3),
  lineHeight: 0,
  '&:after': {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    content: '""',
    display: 'block',
    width: '29px',
    height: '4px',
    borderRadius: '4px',
    transform: 'translateX(-50%)',
    backgroundColor: 'transparent',
    opacity: 0,
    transition: 'all .3s ease-in',
  },
  '&.Lab-active': {
    position: 'relative',
    '&:after': {
      backgroundColor: theme.palette.text.active,
      transform: 'translateX(-50%)',
      opacity: 1,
      transition: 'all .2s ease-out',
    },
  },
  '> div': {
    display: 'inline-block',
    borderRadius: '100%',
  },
}));

type SectionMode = 'standard' | 'shifted';

const Root = styled(Section, {
  shouldForwardProp: (prop) => prop !== 'mode',
})<{ mode: SectionMode }>(({ theme, mode }) => ({
  position: 'relative',
  padding: theme.spacing(39, 0),
  ...(mode === 'shifted' && {
    padding: 0,
    backgroundColor: 'transparent',
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      left: 0,
      height: '50%',
      zIndex: -1,
    },
    '&:before': {
      top: 0,
      backgroundColor: theme.palette.background.lighter,
    },
    '&:after': {
      backgroundColor: theme.palette.background.darker,
      bottom: 0,
    },
  }),
  // backgroundColor: theme.palette.common.white,
  // boxShadow: '0 3px 6px #b9b9b929',
  // '&[disabled]': {
  //   color: theme.palette.text.disabled,
  // },
  '.swiper-pagination-bullet-active': { backgroundColor: theme.palette.primary.main },
  '.swiper-thumbs': { width: '100%' },
  '.LabQuoteSection-navigation': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    margin: theme.spacing(10, 0, 0, 'auto'),
  },
  '.LabQuoteSection-wrapper': {
    padding: theme.spacing(10, 5, 19),
    // transform: 'translateY(-50%)',
    backgroundColor: theme.palette.common.white,
  },
  '.swiper-prev, .swiper-next': {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 3px 6px #b9b9b929',
    '&[disabled]': {
      color: theme.palette.text.disabled,
    },
  },
  [theme.breakpoints.up('sm')]: {
    '.LabQuoteSection-wrapper': {
      padding: theme.spacing(44, 22, 19),
    },
    '.LabQuoteSection-navigation': {
      maxWidth: 420,
    },
  },
  [theme.breakpoints.up('md')]: {
    '.LabQuoteSection-navigation': {
      margin: theme.spacing(0, 0, 0, 'auto'),
    },
  },
}));

const responsiveBreakpoints = {
  360: {
    slidesPerView: 2,
  },
  900: {
    slidesPerView: 3,
  },
};

interface Props {
  items: string[];
  mode?: SectionMode;
}
export default function QuoteSection({ items, mode = 'standard' }: Props) {
  const t = usePageTranslation({ keyPrefix: 'quote-section' });
  const { trackEvent } = useMatomo();

  /* @ts-ignore */
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  return (
    <Root background="darker" mode={mode}>
      <div className="LabQuoteSection-wrapper">
        <SwiperReact
          modules={[A11y, Thumbs, Navigation]}
          thumbs={{ swiper: thumbsSwiper }}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
          className="swiper-main"
          onSlideChange={({ activeIndex }: { activeIndex: number }) => setActiveIndex(activeIndex)}
        >
          {items?.map((item, itemIndex) => (
            <SwiperSlide key={itemIndex}>
              <QuoteCard item={item} index={itemIndex} />
            </SwiperSlide>
          ))}
        </SwiperReact>
        <Grid container>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={8}>
            <div className="LabQuoteSection-navigation">
              <IconButton
                onClick={() => trackEvent({ category: 'quote-section', action: 'click-back' })}
                color="primary"
                className="swiper-prev"
                sx={{ mt: -3, mr: 10 }}
              >
                <ArrowForwardOutlined sx={{ transform: 'rotate(180deg)' }} />
              </IconButton>
              <SwiperReact
                watchSlidesProgress
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={responsiveBreakpoints}
              >
                {items.map((imageUrl, itemIndex) => (
                  <SwiperSlide key={itemIndex}>
                    <Thumb className={clsx({ 'Lab-active': activeIndex === itemIndex })}>
                      <NextImage
                        src={imageUrl}
                        alt={t(`items.${itemIndex}.photo.alt`)}
                        title={t(`items.${itemIndex}.photo.caption`)}
                        width={65}
                        height={65}
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={`/images/placeholder.svg`}
                      />
                    </Thumb>
                  </SwiperSlide>
                ))}
              </SwiperReact>
              <IconButton
                onClick={() => trackEvent({ category: 'quote-section', action: 'click-next' })}
                color="primary"
                className="swiper-next"
                sx={{ mt: -3, ml: 10 }}
              >
                <ArrowForwardOutlined />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </Root>
  );
}
