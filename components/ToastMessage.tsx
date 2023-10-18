import { FC, forwardRef } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ToastMessageProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  severity: any;
}

const ToastMessage: FC<ToastMessageProps> = ({
  isOpen,
  onClose,
  message,
  severity = "success",
}) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={2500} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
