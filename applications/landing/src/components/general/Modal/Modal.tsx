import React, { useMemo } from 'react';

import CloseIcon from '@mui/icons-material/CloseRounded';
import { Container, ContainerProps, IconButton, Modal as MuiModal, ModalProps/* , Typography */ } from '@mui/material';
import { styled } from '@mui/material/styles';

import { usePageTranslation } from '@/context/AppContext';

// import Label from '../Label/Label';

const Root = styled(MuiModal)(({ theme }) => ({
  padding: theme.spacing(6),
  '.MuiTypography-root': {
    overflow: 'visible',
  },
  '.LabModal-container': {
    pointerEvents: 'none',
    position: 'relative',
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
  },
  '.LabModal-paper': {
    pointerEvents: 'all',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    maxHeight: '100%',
    // paddingBottom: theme.spacing(5),
    border: `1px solid ${theme.palette.text.active}`,
    borderRadius: +theme.shape.borderRadius,
    backgroundColor: theme.palette.background.light,
    overflow: 'hidden',
  },
  '.LabModal-header': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(6, 6, 5),
    borderBottom: `1px solid ${theme.palette.divider}`,
    h2: {
      color: theme.palette.text.secondary,
    },
  },
  '.LabModal-close': {
    position: 'absolute',
    top: 20,
    right: 17,
    color: theme.palette.text.primary,
  },
  '.LabModal-content': {
    display: 'flex',
    flexDirection: 'column',
    // gap: theme.spacing(4),
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(10, 6, 10),
    margin: theme.spacing(1, 0, 1),
  },
  '*::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
    borderRadius: +theme.shape.borderRadius * 2,
  },
  '*::-webkit-scrollbar-thumb': {
    borderRadius: '6px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10),
    '.LabModal-header': {
      padding: theme.spacing(6, 14, 5, 11),
    },
    '.LabModal-content': {
      padding: theme.spacing(10, 14, 10, 11),
    },
  },
}));

interface Props extends Omit<ModalProps, 'children' | 'onClose' | 'title'> {
  id: string;
  title?: React.ReactNode;
  // titleTooltip?: string;
  children: React.ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
  lock?: boolean;
  close: () => void;
}

const closeVoid = () => { };

export default function Modal({
  id: idPrefix,
  title,
  // titleTooltip,
  children,
  maxWidth = 'sm',
  lock = false,
  close,
  ...restOfProps
}: Props) {
  const t = usePageTranslation();
  const id = `${idPrefix}ModalTitle`;
  const closer = useMemo(() => (lock ? closeVoid : close), [lock, close]);
  return (
    <Root onClose={closer} aria-labelledby={id} {...restOfProps}>
      <Container maxWidth={maxWidth} className="LabModal-container">
        <div className="LabModal-paper">
          {title && (
            <div className="LabModal-header">
              {/* <Label variant="body" component="h2" color="text.active" fontWeight={500} id={id} tooltip={titleTooltip}>
                {title}
              </Label> */}
              <IconButton
                size="small"
                title={t('common:common.close-modal')}
                aria-label={t('common:common.close-modal')}
                className="LabModal-close"
                onClick={closer}
                disabled={lock}
              >
                <CloseIcon />
              </IconButton>
            </div>
          )}
          <div className="LabModal-content">{children}</div>
        </div>
      </Container>
    </Root>
  );
}
