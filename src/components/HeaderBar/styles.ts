import { Theme } from "@mui/material";
import { makeSx } from "@styles/makeSx";
import { systemConfig } from "@utils/systemConfig";

const drawerWidth = systemConfig.drawer.widthOpen;
const drawerClosedWidth = systemConfig.drawer.widthClose;
const headerHeight = systemConfig.headerBar.height;

interface DrawerProps {
  open: boolean;
}

export const useStyles = makeSx((theme: Theme, props: DrawerProps) => {

  const { open } = props;

  const width = open ? drawerWidth : drawerClosedWidth;

  return {
    appBar: {
      height: `${headerHeight}px`,
      px: 0.5,
      width: {
        xs: '100%',
        md: `calc(100% - ${width}px)`
      },
      background: theme.palette.background.paper,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  }
});

