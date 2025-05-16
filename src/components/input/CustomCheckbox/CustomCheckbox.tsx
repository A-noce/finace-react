import React, { Fragment, useState } from "react";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormHelperText, Typography } from "@mui/material";
import { CustomCheckBoxProps } from "./types";

export const CustomCheckBox = ({
  id,
  label,
  checked,
  onChange,
  formControlLabelProps,
  variantFont = "subtitle2",
  initialValue,
  helperText,
  error,
  ...props
}: CustomCheckBoxProps) => {
  const [check, setCheck] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    if (!props.readOnly) onChange?.(value);
    setCheck(value);
  };

  const getLabel = () => {
    if (!label) return undefined;
    if (typeof label === "string" || typeof label === "number") {
      return (
        <Typography variant={variantFont} color={"textPrimary"}>
          {label}
        </Typography>
      );
    }
    return label;
  };

  const checkedValue = checked !== undefined ? checked : check

  return (
    <Fragment>

    <FormControlLabel
      id={id}
      control={
        <CheckBox
        size={"small"}
        color="primary"
        {...props}
        checked={checkedValue}
        onChange={handleChange}
        />
      }
      label={getLabel()}
      {...formControlLabelProps}
      />
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
      </Fragment>
  );
};