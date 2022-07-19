import React, { ReactElement } from 'react';

import Image from 'next/image';

import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import logoDarkImage from '@/public/images/logo.svg';
import logoLightImage from '@/public/images/logo-light.svg';

const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'size',
})<Props>((/* { size } */) => ({
  display: 'flex',
  // width: '100%',
  '& img': {
    width: '100%',
    // maxWidth: size === 'md' ? 217 : 368,
    maxWidth: '205px !important',
  },
}));

interface Props extends BoxProps {
  size?: 'md' | 'lg';
  isLight?: boolean;
}
export default function Logo({ size = 'md', isLight = false, ...restOfProps }: Props): ReactElement {
  return (
    <Root size={size} {...restOfProps}>
      <Image src={isLight ? logoLightImage : logoDarkImage} alt="" placeholder="empty" />
    </Root>
  );
}
