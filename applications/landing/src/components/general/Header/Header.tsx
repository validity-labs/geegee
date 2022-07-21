import { ReactNode } from 'react';

import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const Title = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'description',
})<{ description: boolean }>(({ theme, description }) => ({
  marginBottom: theme.spacing(description ? 5 : 33),
  textAlign: 'center',
  span: {
    color: theme.palette.text.contrast,
  },
  [theme.breakpoints.up('md')]: {
    whiteSpace: 'pre-line',
  },
}));

export interface HeaderProps extends Partial<Omit<TypographyProps, 'title'>> {
  title: ReactNode;
  description?: string;
  dense?: boolean;
}
const Header = ({ title, description, dense = false, ...restOfProps }: HeaderProps) => {
  return (
    <>
      <Title variant="h1" className="LabHeader-title" description={!!description} {...restOfProps}>
        {title}
      </Title>
      {description && (
        <Typography variant="body-md" textAlign="center" mb={dense ? 11 : 33} mx="auto">
          {description}
        </Typography>
      )}
    </>
  );
};

export default Header;
