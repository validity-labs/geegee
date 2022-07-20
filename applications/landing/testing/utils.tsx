import React, { FC, ReactElement } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { render, RenderOptions } from '@testing-library/react';

import theme from '@/theme';

// Theme provider component wrapper
const MuiThemeProvider: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const withThemeRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: MuiThemeProvider, ...options });

export * from '@testing-library/react';
export { withThemeRender as render };
