import { Button, ButtonProps, Grid } from "@mui/material";
import { ReactNode } from "react";

interface CustomActionsProps {
confirmButtonProp?: ButtonProps & { label?: ReactNode}
closeButtonProp?: ButtonProps & { label?: ReactNode}
  handleClose: () => void;
}

const CustomActions = ({ handleClose, closeButtonProp, confirmButtonProp }: CustomActionsProps) => {
  return (
    <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
      <Grid>
        <Button onClick={handleClose} variant="outlined" {...closeButtonProp}>
          {closeButtonProp?.label ?? 'Close'}
        </Button>
      </Grid>
      <Grid>
        <Button variant="contained" type="submit" {...confirmButtonProp}>
          {confirmButtonProp?.label ?? 'Confirm'}
        </Button>
      </Grid>
    </Grid>
  );
};
export default CustomActions;
