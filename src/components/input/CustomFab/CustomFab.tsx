import { Fab, FabProps,  Tooltip } from "@mui/material";
import { CustomFabProps } from "./type";
import { PropsWithChildren } from "react";

export const CustomFab = ({tooltipProp, title, disabled, children, ...props}: PropsWithChildren<CustomFabProps>) => {
    const defaultProps: FabProps = {...props, color: 'primary', sx: {...props.sx, bottom: 7, right: 7, position: 'fixed'}}
    const fab = <Fab {...defaultProps}  disabled={disabled} >{children}</Fab>

    if(disabled) return fab

    return <Tooltip {...tooltipProp} title={title ?? ''}>
        {fab}
    </Tooltip>
}
