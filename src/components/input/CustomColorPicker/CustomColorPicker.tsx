import { ColorPicker } from "antd";
import { useCallback, useState } from "react";
import { CustomColorPickerProps } from "./type";
import { Color } from "antd/es/color-picker";
import { Box, debounce, FormHelperText } from "@mui/material";

export const CustomColorPicker = ({
  value,
  helperText,
  error,
  ...props
}: CustomColorPickerProps) => {
  const [color, setColor] = useState<Color>();
  const debounceColor = useCallback(
    debounce((d: Color) => {
      "toHex" in props ? props?.onChange?.(d.toHex()) : props.onChange?.(d);
    }, 25),
    [props.onChange]
  );

  const handleChangeColor = (color: Color) => {
    setColor(color);
    debounceColor(color);
  };

  return (
    <Box>
      <ColorPicker
        {...props}
        defaultValue="#000"
        value={value ?? color}
        onChange={handleChangeColor}
      />
      ;
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </Box>
  );
};
