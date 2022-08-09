/* eslint-disable no-unused-vars */
import React from 'react';

import { ThemeOptions } from '@mui/material/styles';
import { CSSProperties } from '@mui/material/styles/createMixins';
import { TypeBackground, TypeText } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    gray: string;
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    transparent: string;
  }
  interface TypeText {
    contrast: string;
    active: string;
  }
}

// declare module "@mui/material/styles/createTheme" {
//   interface Theme {
//   }
//   interface ThemeOptions {
//   }
// }

declare module '@mui/material/styles' {
  interface TypographyVariants {
    'body-xl': React.CSSProperties;
    'body-lg': React.CSSProperties;
    'body-md': React.CSSProperties;
    body: React.CSSProperties;
    'body-sm': React.CSSProperties;
    'body-xs': React.CSSProperties;
    h7: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    'body-xl'?: React.CSSProperties;
    'body-lg'?: React.CSSProperties;
    'body-md'?: React.CSSProperties;
    body?: React.CSSProperties;
    'body-sm'?: React.CSSProperties;
    'body-xs'?: React.CSSProperties;
    h7?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'body-xl': true;
    'body-lg': true;
    'body-md': true;
    body: true;
    'body-sm': true;
    'body-xs': true;
    h7: true;
    body1: false;
    body2: false;
    subtitle1: false;
    subtitle2: false;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    // containedIcon: true;
    // inverted: true;
  }
}

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    divider: CSSProperties;
    radius: (multiplier: number) => CSSProperties;
    border: { outlined: CSSProperties; active: CSSProperties };
    font: {
      title: CSSProperties;
    };
  }
  interface MixinOptions {
    divider: CSSProperties;
    radius: CSSProperties;
    border: { outlined: CSSProperties; active: CSSProperties };
    font: { title: CSSProperties };
  }
}
