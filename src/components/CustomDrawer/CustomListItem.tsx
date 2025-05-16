import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useStylesCustomListItem } from "@components/CustomDrawer/styles";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { IconArrow } from "./IconArrow";
import configStore from "@store/configStore";
import { useTracked } from "zustand-x";

interface CustomListItemProps extends Omit<ListItemProps, "onClick"> {
  name: string;
  icon?: IconType;
  path: string;
  basepath: string;
  isSelected?: boolean;
  onClick?: () => void;
  isCollapse?: boolean;
  isSubItem?: boolean;
}

const CustomListItem = ({
  path,
  basepath,
  icon: Icon,
  name,
  onClick,
  isCollapse,
  isSelected: isSelectedProp,
  isSubItem = false,
  ...props
}: CustomListItemProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSelected = isSelectedProp || pathname.includes(path);
  const isDrawerOpen = useTracked(configStore, 'drawerOpen')

  const showArrow = isCollapse !== undefined;
  const classes = useStylesCustomListItem({
    isSelected,
    isDrawerOpen,
    isSubItem,
  });

  const onClickItem = () => {
    if (onClick) {
      onClick();
      return;
    }
    handleItem();
  };

  const handleItem = () => {
    if (path) {
      navigate(basepath + path);
    }
  };

  return (
    <ListItem {...props}>
      <ListItemButton
        id={`menu=item-${name}`}
        key={`menu=item-${name}`}
        sx={classes("listMenuItem")}
        onClick={onClickItem}
      >
        <Tooltip title={name}>
          <ListItemIcon sx={classes("listMenuIcon")}>
            {Icon ? <Icon/> : <>{' '}</>}
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary={name} />
        {showArrow && (
          <IconArrow isDown={!isCollapse} isDrawerOpen={isDrawerOpen} />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default CustomListItem;
