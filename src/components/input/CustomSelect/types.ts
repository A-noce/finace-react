import { MenuItemProps } from "@mui/material";
import { CustomTextFieldProps } from "../CustomTextField";

export interface SelectOptionProp<T = string> {
  label: string | React.ReactNode;
  value: T;
  menuItemProps?: MenuItemProps;
}

export interface CustomSelectProps extends CustomTextFieldProps {
  options: SelectOptionProp[];
}