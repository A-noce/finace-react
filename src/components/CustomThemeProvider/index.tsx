import { PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useCustomTheme } from "@hooks/useCustomThemeProvider";
import { useTracked } from "zustand-x";
import configStore from "@store/configStore";

const CustomThemeProvider = ({ children }: PropsWithChildren<any>) => {
  const mode = useTracked(configStore,'mode')
  const theme = useCustomTheme(mode === 'dark')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
