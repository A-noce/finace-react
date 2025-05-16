import { routes } from "@components/Routers/menu";
import "./App.css";
import CustomThemeProvider from "@components/CustomThemeProvider";
import Routers from "@components/Routers";
import CustomSnackbar from "@components/CustomSnackbar";
import { BrowserRouter } from "react-router-dom";
import { useStartupSystem } from "@hooks/useStartUpSystem";

function App() {
  useStartupSystem();
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Routers routes={routes} baseRoute="/" />
        <CustomSnackbar />
      </BrowserRouter>
    </CustomThemeProvider>
  );
}

export default App;
