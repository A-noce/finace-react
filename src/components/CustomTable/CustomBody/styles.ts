import { makeSx } from "@styles/makeSx";

export const useStyles = makeSx((theme) => {
  const isDark = theme.palette.mode === "dark";

  return {
    tableRow: (hasOnClick = false) => ({
      cursor: !!hasOnClick ? "pointer" : "default",
      transition: theme.transitions.create(["all"], {
        easing: theme.transitions.easing.sharp,
        duration: 200,
      }),
      "&:hover": {
        background: `${
          isDark ? theme.palette.grey["700"] : theme.palette.grey["200"]
        } !important`,
      },
      "& > td": {
        padding: theme.spacing(1),
        color: "inherit",
      },
      background: theme.palette.background.paper,
      "&:nth-of-type(odd)": {
        backgroundColor: isDark
          ? theme.palette.grey["700"]
          : theme.palette.grey["100"],
      },
    }),
  };
});
