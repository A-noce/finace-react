import { IconButtonProps, TooltipProps } from "@mui/material";
import { IconBaseProps, IconType } from "react-icons";

export interface CustomIconButtonProps extends IconButtonProps {
    id: string;
    icon: IconType;
    iconProps?: IconBaseProps;
    titlle?: string;
    tooltipProps?: TooltipProps;
    loading?: boolean;
  }
  