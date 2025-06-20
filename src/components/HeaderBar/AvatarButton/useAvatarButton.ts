import useService from "@hooks/useServicw";
import { authService } from "@service/authService";
import configStore from "@store/configStore";
import userStore from "@store/userStore";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTracked } from "zustand-x";

export const useAvatarButton = () => {
  const toggleMode = configStore.actions.toggleMode;
  const mode = useTracked(configStore, "mode");
  const user = useTracked(userStore, "user");
  const isDark = mode === "dark";
  const [anchorEl, setAnchorEl] = useState<Element>();
  const navigate = useNavigate();
  const { logout } = useService(authService);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const onLogout = async () => {
    await logout();
    handleClose();
    navigate("/login");
  };
  return {
    handleClick,
    handleClose,
    onLogout,
    open,
    isDark,
    toggleMode,
    anchorEl,
    user
  };
};
