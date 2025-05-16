import { makeSx } from "@styles/makeSx";
import { systemConfig } from "@utils/systemConfig";

interface ContentProps {
  open?: boolean
}

export const useStylesBodyContainer = makeSx(
  (theme, { open }: ContentProps) => {
    const contentWidth = open
      ? systemConfig.drawer.widthOpen
      : systemConfig.drawer.widthClose;

    return {
      content: {
        position: "absolute",
        right: 0,
        bottom: 0,
        display: "flex",
        boxSizing: "border-box",
        width: {
          xs: "100%",
          md: `calc(100% - ${contentWidth}px)`,
        },
        height: `calc(100% - ${systemConfig.headerBar.height}px)`,
        background: theme.palette.background.default,
        transition: theme.transitions.create(["width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        padding: 1,
        paddingTop: 3,
        '& > div': {
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'auto'
        }
      },
    };
  }
);
