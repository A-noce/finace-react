import { AlertProps, PaletteMode, SnackbarProps } from "@mui/material";
import { createStore } from "zustand-x";

interface ConfigStore {
  mode: PaletteMode;
  drawerOpen: boolean;
  snack: {
    snackbarProps: SnackbarProps;
    alertProps: AlertProps;
  };
}

const configStore = createStore<ConfigStore>(
  {
    mode: "light",
    drawerOpen: true,
    snack: {
      snackbarProps: {},
      alertProps: {},
    },
  },
  {
    name: "config",
  }
).extendActions(({ set, get }) => ({
  toggleMode: () => set("mode", get("mode") === "dark" ? "light" : "dark"),
  closeDrawer: () => set("drawerOpen", false),
  openDrawer: () => set("drawerOpen", true),
  toggleDrawer: () => set("drawerOpen", !get("drawerOpen")),
  setSnackProps: (
    message: SnackbarProps["message"],
    severity?: AlertProps["severity"],
    props?: {
      snackbarProps?: SnackbarProps;
      alertProps?: AlertProps;
    }
  ) => {
    const previous = get("snack");
    set("snack", {
      snackbarProps: {
        ...previous.snackbarProps,
        ...props?.snackbarProps,
        open: true,
        message,
      },
      alertProps: { ...previous.alertProps, ...props?.alertProps, severity },
    });
  },
  closeSnack: () => {
    const previous = get("snack");
    set("snack", {...previous, snackbarProps: {...previous.snackbarProps, open: false} })}
}));

export default configStore;
