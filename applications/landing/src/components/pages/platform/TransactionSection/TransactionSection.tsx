import * as React from 'react';

import { Typography } from '@mui/material';
import { styled } from "@mui/material/styles";

import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';

const Root = styled(Section)(({ theme }) => ({
  paddingTop: theme.spacing(22.5),
  paddingBottom: theme.spacing(22.5),
  '.LabTransactionSection-title': {
    marginBottom: theme.spacing(9),
    fontSize: '0.8125rem', // 13px
    lineHeight: 1.66,
  },
  [theme.breakpoints.up("md")]: {},
}));

const TransactionSection = () => {
  const t = usePageTranslation({ keyPrefix: 'transaction-section' });
  return (
    <Root>
      <Typography variant="h1" className="LabTransactionSection-title">{t('title')}</Typography>
    </Root>
  );
};

export default TransactionSection;
