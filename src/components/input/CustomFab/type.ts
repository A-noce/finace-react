import { FabProps, TooltipProps } from "@mui/material";

export interface CustomFabProps extends FabProps {
    tooltipProp?: TooltipProps
    title?: string
    disabled?: boolean
}