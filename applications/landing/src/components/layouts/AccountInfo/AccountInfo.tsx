import * as React from 'react';

import { Fade, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import LoadingText from '@/components/general/LoadingText/LoadingText';
import GeeGeeWalletIcon from '@/components/icons/GeeGeeWalletIcon';
import { useAccount } from '@/context/AppContext';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '.LabAccountInfo-icon': {
    marginLeft: theme.spacing(2),
    fontSize: '28px',
  },
}));

export default function AccountInfo() {
  const { isOffline, isBalanceLoading, balance } = useAccount();

  if (isOffline) {
    return null;
  }
  return (
    <Fade in appear>
      <Root>
        <Typography variant="body-sm" fontWeight={600}>
          <LoadingText loading={isBalanceLoading} text={balance || '0.0000'} />
        </Typography>
        <GeeGeeWalletIcon color="secondary" className="LabAccountInfo-icon" />
      </Root>
    </Fade>
  );
}
