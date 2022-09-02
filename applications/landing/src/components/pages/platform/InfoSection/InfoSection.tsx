import * as React from 'react';

import { useTranslation } from 'next-i18next';

import { Button, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";

import ConnectButton from '@/components/general/ConnectButton/ConnectButton';
import LoadingText from '@/components/general/LoadingText/LoadingText';
import Section from '@/components/layouts/Section/Section';
import { useAccount, usePageTranslation } from '@/context/AppContext';
import { useWalletSelector } from '@/context/WalletSelectorContext';

const Root = styled(Section)(({ theme }) => ({
  paddingTop: theme.spacing(5.5),
  paddingBottom: theme.spacing(5.5),
  // marginTop: theme.spacing(27),
  '.LabInfoSection-content': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(6),
  },
  '.LabInfoSection-info': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  '.LabInfoSection-infoText': {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 0, 0, 3.5),
  },
  '.LabInfoSection-infoBalance': {
    fontSize: '1.5625rem', // 25px
    lineHeight: 1,
    fontWeight: 600,
    color: theme.palette.text.active,
  },
  '.LabInfoSection-send': {
    color: theme.palette.text.active,
  },
  '.LabInfoSection-actions': {
    display: 'flex',
    gap: theme.spacing(10),
  },



  [theme.breakpoints.up("md")]: {},
}));

const InfoSection = () => {
  const t = usePageTranslation({ keyPrefix: 'info-section' });
  const { t: tRaw } = useTranslation();
  const { isBalanceLoading, balance } = useAccount();

  const { accountId } = useWalletSelector();

  return (
    <Root className="Lab-divider">
      <div className="LabInfoSection-content">
        <div className="LabInfoSection-info">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-small.svg" width="42" height="42" alt="" />
          <div className="LabInfoSection-infoText">
            {accountId ? (
              <>
                <Typography className="LabInfoSection-infoBalance" >
                  <LoadingText loading={isBalanceLoading} text={balance || '0.0000'} />
                </Typography>
                <Typography variant="body-xs" fontWeight={600}>
                  {tRaw('currency.native')}
                </Typography>
              </>
            ) : (<Typography variant="body-md" sx={{ color: "text.primary" }}>{tRaw('common.connect-prompt')}</Typography>)}
          </div>
        </div>
        <div className="LabInfoSection-actions">
          {accountId && <Button
            className="LabInfoSection-send"
          // startIcon={isSubmitting && <CircularProgress color="success" size={24} />}
          >
            {t('send-native')}
          </Button>}
          <ConnectButton />
        </div>
      </div>
    </Root>
  );
};

export default InfoSection;
