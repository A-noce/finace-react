import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { useStylesBodyContainer } from "@components/BodyContainer/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTracked } from "zustand-x";
import configStore from "@store/configStore";

const BodyContainer = ({ children }: PropsWithChildren<any>) => {
  const open = useTracked(configStore, 'drawerOpen')
  const sx = useStylesBodyContainer({ open });

  return (
    <React.Suspense fallback={"carregando..."}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={sx("content")}>{children}</Box>
      </LocalizationProvider>
    </React.Suspense>
  );
};

export default BodyContainer;
