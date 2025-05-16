import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { useState } from "react";
import { CustomGroupCheckboxProps } from "./type";

export const CustomGroupCheckbox = <T,>({
  id,
  options,
  onCheck,
  title,
  helperText,
  error,
  disabled: disabledAll,
  ...props
}: CustomGroupCheckboxProps<T>) => {
  const [array, setArray] = useState(!props.value ? [] : props.value);
  const handleCheck = (value: T) => {
    return () => {
      let tempArray = array;
      if (array?.includes(value)) {
        tempArray.filter((v) => v !== value);
      } else {
        tempArray.push(value);
      }
      setArray(tempArray);
      onCheck?.(tempArray);
    };
  };

  const valueArray = !props.value ? array : props.value
  return (
    <FormControl id={id}>
      <FormLabel>{title}</FormLabel>
      <FormGroup {...props}>
        {options.map(
          ({
            label,
            value,
            checkBoxProps,
            formControlLabelProps,
            disabled,
          }) => (
            <FormControlLabel
              key={`${label}-${value}`}
              label={label}
              value={value}
              control={
                <CheckBox
                  onChange={handleCheck(value)}
                  checked={valueArray.includes(value)}
                  disabled={disabledAll || disabled}
                  {...checkBoxProps}
                />
              }
              {...formControlLabelProps}
            />
          )
        )}
      </FormGroup>
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
