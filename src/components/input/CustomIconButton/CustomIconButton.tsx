import {
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CustomIconButtonProps } from "./types";

export const CustomIconButton = ({
  title,
  tooltipProps,
  icon: IconParam,
  loading = false,
  iconProps,
  ...props
}: CustomIconButtonProps) => {
  const icon = loading ? (
    <CircularProgress size={props?.size || 16} />
  ) : (
    <IconParam size={16} {...iconProps} />
  );

  if (title) {
    return (
      <Tooltip title={title} {...tooltipProps}>
        <IconButton size="large" {...props}>
          {icon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <IconButton size="large" {...props}>
      {icon}
    </IconButton>
  );
};
