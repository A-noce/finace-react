import { makeSx } from "@styles/makeSx";

export const useStyles = makeSx((theme) => {
  return {
    header: {
      padding: 0,
      position: "sticky",
      top: 0,
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
      zIndex: 1,
    },
    headerCell: {
      padding: theme.spacing(0.5),
      color: "white !important",
      whiteSpace: "nowrap",
      transition: theme.transitions.create(["color"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      "&:active": {
        color: "white",
      },
      "&:hover": {
        color: "#e5e5e5 !important",
      },
      "& > svg": {
        color: "white !important",
      },
    },
  };
});
