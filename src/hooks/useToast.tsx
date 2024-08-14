import { Alert, Snackbar } from '@mui/material';
import { useCallback, useState } from 'react';

interface ToastOptions {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

export const useToast = () => {
  const [open, setOpen] = useState(false);
  const [toastOptions, setToastOptions] = useState<ToastOptions>({
    message: '',
    severity: 'info',
    duration: 3000,
  });

  const showToast = useCallback(
    (
      message: string,
      severity: 'success' | 'info' | 'warning' | 'error' = 'info',
      duration: number = 3000,
    ) => {
      setToastOptions({ message, severity, duration });
      setOpen(true);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const ToastComponent = () => (
    <Snackbar
      open={open}
      autoHideDuration={toastOptions.duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert onClose={handleClose} severity={toastOptions.severity} sx={{ width: '100%' }}>
        {toastOptions.message}
      </Alert>
    </Snackbar>
  );

  return { showToast, ToastComponent };
};
