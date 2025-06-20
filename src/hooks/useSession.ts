import { authService } from "@service/authService";
import useService from "./useServicw";
import { useNavigate, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import userStore from "@store/userStore";
import { useTracked } from "zustand-x";

export const useSession = () => {
  const { session } = useService(authService);
  const { location } = useNavigation();
  const navigate = useNavigate();
  const isLogged = useTracked(userStore, "isLogged");
  const setUser = userStore.actions.setUser;

  const checkSession = async (path: string) => {
    const response = await session();
    const isLoginPage = /login/i.test(path);
    if (response.success) {
      setUser(response.body);
      navigate(isLoginPage ? "/home" : path);
    } else {
      setUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!location) return;
    if (isLogged) {
      const isLoginPage = /login/i.test(location.pathname);
      navigate(isLoginPage ? "/home" : location.pathname);
    }
    if (!isLogged) {
      checkSession(location.pathname);
    }
  }, [location?.pathname]);
};
