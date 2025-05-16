import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import CustomIconButton from "@components//input/CustomIconButton";
import configStore from "@store/configStore";
import { useTracked } from "zustand-x";

const ModeButton = () => {
  const toggleMode = configStore.actions.toggleMode
  const mode = useTracked(configStore, 'mode')
  const isDark = mode === "dark";

  if (isDark) {
    return (
      <CustomIconButton
        icon={MdOutlineLightMode}
        iconProps={{ size: 20 }}
        id="light-button"
        title="Modo light"
        onClick={toggleMode}
      />
    );
  }

  return (
    <CustomIconButton
      id="dark-button"
      icon={MdOutlineDarkMode}
      iconProps={{ size: 20 }}
      title="Modo dark"
      onClick={toggleMode}
    />
  );
};

export default ModeButton;
