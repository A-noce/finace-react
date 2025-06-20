import { Grid, MenuItem, Typography } from "@mui/material";
import { FaPowerOff } from "react-icons/fa6";

interface LogoutItemProps {
  onLogout: () => void;
}

const LogoutItem = ({ onLogout }: LogoutItemProps) => {
  return (
    <MenuItem onClick={onLogout}>
      <Grid container columnGap={1}>
        <Grid>
          <FaPowerOff />
        </Grid>
        <Grid>
          <Typography>Logout</Typography>
        </Grid>
      </Grid>
    </MenuItem>
  );
};

export default LogoutItem;
