import { MenuItem } from "@mui/material";
import { CustomTextField } from "../CustomTextField/CustomTexField";
import { CustomSelectProps } from "./types";

export const CustomSelect = ({ options, ...props }: CustomSelectProps) => {
  return (
    <CustomTextField
      select
      {...props}
      slotProps={{
        select: {
          MenuProps: {
            style: {
              maxHeight: 500,
            },
          },
          ...props.slotProps?.select,
        },
      }}
    >
      {options.map((op, index) => {
        return (
          <MenuItem
            {...op.menuItemProps}
            id={`${props.id}--menu-item--${index}`}
            key={op.value}
            value={op.value}
          >
            {op.label}
          </MenuItem>
        );
      })}
    </CustomTextField>
  );
};
