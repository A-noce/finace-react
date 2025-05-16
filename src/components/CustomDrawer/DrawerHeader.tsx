import { Grid, Typography } from "@mui/material";
import { useStyles } from "./styles";
import CustomIconButton from "@components/input/CustomIconButton";
import { FaAngleLeft } from "react-icons/fa6";
import chartLogo from '@assets/chart-icon.svg'
import CustomDrawImage from "@components/CustomDrawImage";

interface DrawerHeaderProps {
  toogleDrawer: () => void;
  showTitle: boolean;
}

const DrawerHeader = ({ showTitle, toogleDrawer }: DrawerHeaderProps) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <CustomDrawImage image={chartLogo} alt="finance-logo"  sx={classes('drawerHeaderIcon')}/>
      {showTitle && (
        <>
          <Grid sx={classes("drawerHeaderText")}>
            <Typography sx={classes("drawerHeaderText")}>
              Finance $
            </Typography>
          </Grid>

          <Grid>
              <CustomIconButton
                id={"close-drawer"}
                title={showTitle ? "Retrair" : "Expandir"}
                icon={FaAngleLeft}
                iconProps={{ size: 24 }}
                onClick={toogleDrawer}
              />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DrawerHeader;
