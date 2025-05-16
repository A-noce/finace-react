import BodyContainer from "@components/BodyContainer";
import CustomDrawer from "@components/CustomDrawer";
import HeaderBar from "@components/HeaderBar";
import userStore from "@store/userStore";
import { Navigate, Outlet } from "react-router-dom";
import { useTracked } from "zustand-x";

export const PrivateRoutes = () => {
  const isLogged = useTracked(userStore, "isLogged");
  const component = isLogged ? <Outlet /> : <Navigate to="/login" replace />;
  return (
    <>
      <HeaderBar />
      <CustomDrawer />
      <BodyContainer>{component}</BodyContainer>
    </>
  );
};
