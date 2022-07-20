import * as React from 'react';

import { Alert, AlertProps, Slide, SlideProps, Snackbar, SnackbarProps } from '@mui/material';

interface ShowOptions {
  alertProps?: AlertProps;
  snackbarProps?: SnackbarProps;
}

// eslint-disable-next-line no-unused-vars
type ShowContext = (msg: string | React.ReactNode, options?: ShowOptions) => void;
type TransitionProps = Omit<SlideProps, 'direction'>;

interface SnackbarProviderProps {
  children: React.ReactNode;
}

const SnackbarContext = React.createContext<ShowContext>(() => {});

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [message, setMessage] = React.useState<React.ReactNode>();
  const [open, setOpen] = React.useState(false);
  const alertPropsRef = React.useRef({});
  const snackbarPropsRef = React.useRef({});

  const handleClose = (_event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const show = React.useCallback(
    (msg: string | React.ReactNode, { alertProps, snackbarProps }: ShowOptions = {}) => {
      alertPropsRef.current = { severity: 'success', ...alertProps };
      snackbarPropsRef.current = { ...snackbarProps };

      setMessage(msg);
      setOpen(true);
    },
    [setOpen],
  );

  return (
    <SnackbarContext.Provider value={show}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={TransitionUp}
        color="primary"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        {...snackbarPropsRef.current}
      >
        <Alert onClose={handleClose} variant="filled" {...alertPropsRef.current}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

function useSnack() {
  return React.useContext(SnackbarContext);
}

export { SnackbarProvider, useSnack };
