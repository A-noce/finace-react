import { makeSx } from "@styles/makeSx";

export const useStyles = makeSx((theme, onClick?: any) => {
  const isDark = theme.palette.mode === "dark";

  return {
    tablePaper: {
      boxSizing: "border-box",
      position: "relative",
      width: "100%",
      overflow: "hidden",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      border: `1px solid ${
        isDark ? theme.palette.grey["600"] : theme.palette.grey["300"]
      }`,
      padding:0,
      borderTopWidth: 0,
      borderRadius: 1,
    },
  };
});
