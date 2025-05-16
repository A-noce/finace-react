import {
  ButtonProps,
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
} from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import CustomActions from "./CustomActions";

interface DialogComponentProps {
  dialogTitle?: DialogTitleProps;
  dialogContent?: DialogContentProps;
  dialogActions?: DialogActionsProps;
}

interface CustomModalProps extends Omit<DialogProps, "title"> {
  title?: ReactNode;
  handleClose: () => void;
  actions?: ReactNode;
  confirmButtonProp?: ButtonProps & { label?: ReactNode };
  closeButtonProp?: ButtonProps & { label?: ReactNode };
  dialogProps?: DialogComponentProps;
}

const CustomModal = ({
  open,
  handleClose,
  title = "Confirmar",
  children,
  actions,
  dialogProps,
  closeButtonProp,
  confirmButtonProp,
  ...props
}: PropsWithChildren<CustomModalProps>) => {
  if (!open) {
    return null;
  }

  return (
    <Dialog {...props} open>
      <DialogTitle {...dialogProps?.dialogTitle}>{title}</DialogTitle>
      <DialogContent {...dialogProps?.dialogContent}>{children}</DialogContent>
      <DialogActions {...dialogProps?.dialogActions}>
        {actions ?? (
          <CustomActions
            handleClose={handleClose}
            {...{ closeButtonProp, confirmButtonProp }}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
