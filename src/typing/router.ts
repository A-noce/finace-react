import { MenuItem } from "@mui/material";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export interface RouteItem {
  path: string;
  component: ReactNode;
}

export interface MenuItem extends Omit<RouteItem, 'component'> {
  name: string;
  path: string;
  icon?: IconType;
  component: ReactNode;
}

export interface MenuSubItem extends MenuItem {
  subItem: MenuItem[];
}

export type MenuList = (MenuItem | MenuSubItem)[]
