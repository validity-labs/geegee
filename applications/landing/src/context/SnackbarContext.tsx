import { createContext, ReactNode, SyntheticEvent, useCallback, useContext, useRef, useState } from 'react';

import { Alert, AlertProps, Slide, SlideProps, Snackbar, SnackbarCloseReason, SnackbarProps } from '@mui/material';

interface ShowOptions {
  alertProps?: AlertProps;
  snackbarProps?: SnackbarProps;
}

// eslint-disable-next-line no-unused-vars
type ShowContext = (msg: string | ReactNode, options?: ShowOptions) => void;
type TransitionProps = Omit<SlideProps, 'direction'>;

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarContext = createContext<ShowContext>(() => { });

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [message, setMessage] = useState<ReactNode>();
  const [open, setOpen] = useState(false);
  const alertPropsRef = useRef({});
  const snackbarPropsRef = useRef({});

  const handleClose = useCallback((_event: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, [setOpen]);


  const handleAlertClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);



  const show = useCallback(
    (msg: string | ReactNode, { alertProps, snackbarProps }: ShowOptions = {}) => {
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
        <Alert onClose={handleAlertClose} variant="filled" {...alertPropsRef.current}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

function useSnack() {
  return useContext(SnackbarContext);
}

export { SnackbarProvider, useSnack };
