import { Alert, AlertProps, Snackbar, SnackbarProps } from "@mui/material";
import configStore from "@store/configStore";
import { useTracked } from "zustand-x";

export const CustomSnackbar = () => {
  const props = useTracked(configStore, "snack");
  const action = configStore.actions.closeSnack

  const message = props.snackbarProps.message;
  const snackProps: SnackbarProps = {
    autoHideDuration: 6000,
    anchorOrigin: { vertical: "bottom", horizontal: "center" },
    onClose: action,
    ...props.snackbarProps,
  };

  const alertProps: AlertProps = {
    severity: "info",
    variant: "filled",
    sx: { width: "100%" },
    ...props.alertProps,
  };

  return (
    <Snackbar {...snackProps}>
      <Alert {...alertProps}>{message}</Alert>
    </Snackbar>
  );
};
