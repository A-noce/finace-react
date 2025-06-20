import { AppBar, Grid, Toolbar } from "@mui/material";
import { useStyles } from "./styles";
import { FaAngleRight } from "react-icons/fa6";
import CustomIconButton from "@components/input/CustomIconButton";
import { useTracked } from "zustand-x";
import configStore from "@store/configStore";
import AvatarButton from "./AvatarButton";

const HeaderBar = () => {
  const isDrawerOpen = useTracked(configStore, 'drawerOpen')
  const toogleDrawer = configStore.actions.toggleDrawer
  const classes = useStyles({ open: isDrawerOpen });
  return (
    <AppBar position="fixed" sx={classes("appBar")}>
      <Toolbar disableGutters variant={"dense"} >
        <Grid container justifyContent="flex-end" spacing={2} padding={1} width={1}>
          {!isDrawerOpen && (
            <Grid size={{xs: "grow"}}>
              <CustomIconButton
                id={"close-drawer"}
                title={"Expandir"}
                icon={FaAngleRight}
                iconProps={{ size: 24 }}
                onClick={toogleDrawer}
              />
            </Grid>
          )}
          <Grid>
            <AvatarButton />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
