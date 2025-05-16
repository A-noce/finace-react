import { Drawer, Grid, List } from "@mui/material";
import { useStyles } from "@components/CustomDrawer/styles";
import useThemeBreakPoints from "@hooks/useThemeBreakPoints";
import DrawerHeader from "@components/CustomDrawer/DrawerHeader";
import { menu } from "@components/Routers/menu";
import CustomListItem from "@components/CustomDrawer/CustomListItem";
import CustomListItemGroup from "./CustomListItemGroup";
import { useTracked } from "zustand-x";
import configStore from "@store/configStore";

const CustomDrawer = () => {
  const isDrawerOpen = useTracked(configStore, 'drawerOpen')
  const toogleDrawer = configStore.actions.toggleDrawer
  const { isMatch: isDownSm } = useThemeBreakPoints(["down", "md"]);
  const classes = useStyles({ open: isDrawerOpen });

  const list = menu.map((item, index) => {
    if ("subItem" in item) {
      return (
        <CustomListItemGroup
          key={`index:${index}-path:${item.path}`}
          item={item}
        />
      );
    }
    return (
      <CustomListItem
        key={`index:${index}-path:${item.path}`}
        basepath="/"
        icon={item.icon}
        name={item.name}
        path={item.path}
      />
    );
  });

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={toogleDrawer}
      variant={isDownSm ? "temporary" : "permanent"}
      anchor="left"
      sx={classes("drawer")}
    >
      <Grid container direction={"column"} wrap={"nowrap"} height={"100%"}>
        <Grid>
          <DrawerHeader showTitle={isDrawerOpen} toogleDrawer={toogleDrawer} />
        </Grid>
        <Grid sx={{ overflowY: "auto", overflowX: "hidden" }}>
          <List>{list}</List>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default CustomDrawer;
