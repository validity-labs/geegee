import { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCopyToClipboard } from 'react-use';

import CopyIcon from '@/components/icons/CopyIcon';
import { useSnack } from '@/context/SnackbarContext';
import { stopPropagation } from '@/libs/helpers';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  button: {
    position: 'relative',
    top: -2,
    marginLeft: theme.spacing(2),
    color: theme.palette.text.active,
  },
  '.LabAddress-address': {
    display: 'flex',
    wordBreak: 'break-all',
    lineHeight: 1,
  },
  '.LabAddress-prefix': {
    display: ['block'/* , '-webkit-box' */],
    maxWidth: '100%',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: 'inherit',
  },
  '.LabAddress-postfix': {
    whiteSpace: 'nowrap',
  },
}));

interface Props {
  address: string;
  copy?: boolean;
}

const Address = ({ address = '', copy = true }: Props) => {
  const { t } = useTranslation();
  const snack = useSnack();
  const [, copyToClipboard] = useCopyToClipboard();

  const parts = useMemo(() => {
    return {
      prefix: address.slice(0, -10),
      postfix: address.slice(-10),
    };
  }, [address]);

  const handleCopy = useCallback(() => {
    copyToClipboard(address);
    snack({
      message: t('common.copied'),
    });
  }, [copyToClipboard, address, t, snack]);

  return (
    <Root className="LabAddress-root">
      <Typography variant="body-sm" className="LabAddress-address" title={address}>
        <span className="LabAddress-prefix">{parts.prefix}</span>
        <span className="LabAddress-postfix">{parts.postfix}</span>
      </Typography>
      {copy && (
        <IconButton
          size="small"
          title={t('common.copy')}
          aria-label={t('common.copy')}
          onClick={stopPropagation(handleCopy)}
        >
          <CopyIcon />
        </IconButton>
      )}
    </Root>
  );
};

export default Address;
