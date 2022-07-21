import React, { ReactElement } from 'react';

import Image, { ImageProps } from 'next/image';

import { Box, BoxProps, Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';

import { ExternalImage, StaticImageData } from '@/typings/app';

const Root = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.contrast,
  padding: theme.spacing('255px', 0, 62.5),
  // [theme.breakpoints.up('md')]: {
  //   padding: theme.spacing('220px', 0, 14),
  // },
  '>.MuiContainer-root': {
    position: 'relative',
  },
  '.LabHero-image': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    '&.overlay:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: `linear-gradient(rgba(35,38,47, 0.5), rgba(35,38,47, 0.5))`,
    },
    img: {
      filter: 'none !important',
    },
  },
}));

interface Props extends BoxProps {
  children?: React.ReactNode;
  containerProps?: ContainerProps;
  hasContainer?: boolean;
  coverImage?: StaticImageData;
  coverImageProps?: Partial<ImageProps>;
  cover?: ExternalImage;
  overlay?: boolean;
}

export default function Hero({
  children,
  hasContainer = true,
  containerProps = {},
  coverImage,
  coverImageProps = {},
  cover,
  overlay = false,
  ...props
}: Props): ReactElement {
  return (
    // @ts-ignore: types do not work as expected with component prop
    <Root component="section" {...props}>
      {coverImage && (
        <div className={clsx('LabHero-image', { overlay: overlay })}>
          <Image
            src={coverImage}
            alt=""
            layout="fill"
            placeholder="empty"
            objectFit="cover"
            objectPosition="top"
            {...coverImageProps}
          />
        </div>
      )}
      {cover && (
        <div className={clsx('LabHero-image', { overlay: overlay })}>
          <Image
            src={cover.url}
            alt={cover.alt}
            title={cover.caption}
            layout="fill"
            placeholder="empty"
            objectFit="cover"
            objectPosition="top"
          />
        </div>
      )}
      {hasContainer ? <Container {...containerProps}>{children}</Container> : children}
    </Root>
  );
}
