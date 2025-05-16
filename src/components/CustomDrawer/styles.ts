import { Theme, alpha } from "@mui/material";
import { makeSx } from "@styles/makeSx";
import { systemConfig } from "@utils/systemConfig";

const drawerWidth = systemConfig.drawer.widthOpen;
const drawerClosedWidth = systemConfig.drawer.widthClose;
const headerHeight = systemConfig.headerBar.height;

interface DrawerProps {
  open: boolean;
}

interface CustomListItemProps {
  isDrawerOpen: boolean;
  isSelected: boolean;
  isSubItem: boolean;
}

interface ArrowProps {
  isDown: boolean;
  isDrawerOpen: boolean;
}

export const useStyles = makeSx((theme: Theme, props: DrawerProps) => {
  const isDark = theme.palette.mode === "dark";

  const { open } = props;

  const width = open ? drawerWidth : drawerClosedWidth;
  const textWidth = open ? "100%" : "0%";

  return {
    drawerHeader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      overflowX: "hidden",
      height: headerHeight,
      background: isDark
        ? theme.palette.background.paper
        : theme.palette.primary.main,
    },
    drawerHeaderIcon: {
      flexShrink: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: headerHeight,
      padding: theme.spacing(2),
      width: headerHeight,
      "& .img": {
        fill: theme.palette.common.white,
      }
    },
    drawerHeaderText: {
      width: textWidth,
      color: theme.palette.common.white,
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    drawer: {
      width,
      flexShrink: 0,
      whiteSpace: "nowrap",
      overflowX: "hidden",
      "& .MuiDrawer-paper": {
        width,
        boxSizing: "border-box",
        background: isDark
          ? theme.palette.background.paper
          : theme.palette.primary.main,
        borderRight: 0,
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      "& .MuiListItem-root": {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  };
});

export const useStylesCustomListItem = makeSx(
  (theme, props: CustomListItemProps) => {
    const { isSelected, isDrawerOpen, isSubItem } = props;

    const listItemText = "#fff";
    const listItemTextSecondary = "#ffffff8a";

    return {
      listMenuIcon: {
        color: listItemText,
      },
      listMenuItem: {
        pl: isSubItem && isDrawerOpen ? 4.5 : 2,
        position: "relative",
        height: 50,
        color: listItemText,
        background: isSelected ? alpha(listItemText, 0.2) : undefined,
        "&:hover": {
          background: alpha(listItemText, isSelected ? 0.6 : 0.3),
        },
        transition: theme.transitions.create(["padding", "background"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        "& .MuiListItemText-secondary": {
          color: listItemTextSecondary,
        },
        "& .MuiListItemText-primary": {
          whiteSpace: "break-spaces",
        },
        "& .MuiListItem-root": {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    };
  }
);

export const useStyleIconArrow = makeSx((theme, props: ArrowProps) => {
  const { isDown, isDrawerOpen } = props;

  const positionOnDrawerClose = {
    position: "absolute",
    right: "1.5px",
  };

  return {
    arrow: {
      ...(!isDrawerOpen ? positionOnDrawerClose : {}),
      transform: !isDown ? "rotate(180deg)" : "none",
      transition: theme.transitions.create(["transform"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  };
});
