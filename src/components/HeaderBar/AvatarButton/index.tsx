import { Avatar, Box, IconButton, Menu } from "@mui/material";
import LogoutItem from "./LogoutItem";
import { useAvatarButton } from "./useAvatarButton";
import ModeButton from "./ModeButton";

const AvatarButton = () => {
  const {
    anchorEl,
    handleClick,
    handleClose,
    isDark,
    onLogout,
    open,
    toggleMode,
    user
  } = useAvatarButton();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <IconButton
        id="avatar-button"
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar alt={user?.email} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ModeButton isDark={isDark} toggleMode={toggleMode} />
        <LogoutItem onLogout={onLogout} />
      </Menu>
    </Box>
  );
};

export default AvatarButton;
