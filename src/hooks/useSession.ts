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
  const setLogged = userStore.actions.setLogged;

  const checkSession = async (path: string) => {
    const response = await session();
    const isLoginPage = /login/i.test(path)
    if (response.success) {
      setLogged(true);
      navigate(isLoginPage ? "/home" : path);
    } else {
      navigate(isLoginPage ? path : '/login');
    }
  };

  useEffect(() => {
    if (!location) return;
    if (isLogged && /login/i.test(location?.pathname)) {
      navigate("/home");
    }
    if (!isLogged) {
      checkSession(location.pathname);
    }
  }, [location]);
};
