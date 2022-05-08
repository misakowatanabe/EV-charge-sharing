import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../context/Hooks";
import {
  selectSnackbarData,
  updateSnackbarData,
} from "../context/slices/SnackbarDataSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertSnackbar() {
  const snackbar = useSelector(selectSnackbarData);
  const dispatch = useAppDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(
      updateSnackbarData({
        snackState: false,
        severity: "info",
        message: "",
      })
    );
  };

  return (
    <Snackbar
      open={snackbar.snackState}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        variant="standard"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
