import React, { useEffect, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { FormControl, FormHelperText } from "@mui/material";
import { CustomRadioGroupProps } from "./types";

export const CustomRadioGroup = <T extends string>({
  id,
  initialValue,
  value,
  onChange,
  radios,
  helperText,
  error,
  ...props
}: CustomRadioGroupProps<T>) => {
  const [selectedRadio, setSelectedRadio] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value);
    setSelectedRadio(value);
  };

  useEffect(() => {
    if (!initialValue) return;
    setSelectedRadio(initialValue);
  }, [initialValue]);

  return (
    <FormControl>
      <RadioGroup
        id={id}
        onChange={handleChange}
        value={selectedRadio || value}
        {...props}
      >
        {radios.map((rd, index) => {
          return (
            <FormControlLabel
              id={`${id}--form-control-label--${index}`}
              control={
                <Radio
                  id={`${id}--radio--${index}`}
                  size={"small"}
                  color={"primary"}
                  {...rd.radioProps}
                />
              }
              label={rd.label}
              value={rd.value}
              key={`${rd.label}-${rd.value}`}
              {...rd.formControlLabelProps}
            />
          );
        })}
      </RadioGroup>
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};