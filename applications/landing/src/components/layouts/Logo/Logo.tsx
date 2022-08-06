import React, { ReactElement } from 'react';

import Image from 'next/image';

import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

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
}
export default function Logo({ size = 'md', ...restOfProps }: Props): ReactElement {
  return (
    <Root size={size} {...restOfProps}>
      <Image src="/images/logo.svg" alt="" width={188} height={47} placeholder="empty" />
    </Root>
  );
}
