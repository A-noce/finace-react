import { RouteItem } from "@typing/router";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { lazy } from "react";

interface RoutersProps {
  routes: RouteItem[];
  baseRoute: string;
}
const Login = lazy(() => import("@pages/Login"));
const NotFound = lazy(() => import("@pages/NotFound"));

const Routers = ({ routes }: RoutersProps) => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoutes />}>
          {routes.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={item.component}
              />
            );
          })}
        </Route>
      </Routes>
  );
};

export default Routers;
