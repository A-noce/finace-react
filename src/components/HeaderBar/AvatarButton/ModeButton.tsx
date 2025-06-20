import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Grid, MenuItem, Typography } from "@mui/material";

interface ModeButtonProps {
  isDark: boolean;
  toggleMode: () => void;
}

const ModeButton = ({ isDark, toggleMode }: ModeButtonProps) => {
  const Icon = isDark ? MdOutlineLightMode : MdOutlineDarkMode;
  const title = isDark ? "Light Mode" : "Dark Mode";

  return (
    <MenuItem onClick={toggleMode} sx={{ justifyContent: "center" }}>
      <Grid container columnGap={1} alignItems="center">
        <Grid>
          <Icon size={20} />
        </Grid>
        <Grid>
          <Typography>{title}</Typography>
        </Grid>
      </Grid>
    </MenuItem>
  );
};

export default ModeButton;
