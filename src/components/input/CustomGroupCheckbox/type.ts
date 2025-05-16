import { CheckboxProps, FormControlLabelProps, FormGroupProps } from "@mui/material";
import { ReactNode } from "react";

export interface CheckboxListValue<T> {
  label: ReactNode;
  value: T;
  disabled?: boolean
  formControlLabelProps?: Omit<FormControlLabelProps, "control" | "label">;
  checkBoxProps?: Omit<CheckboxProps, "onChange" | "value">;
}

export interface CustomGroupCheckboxProps<T> extends FormGroupProps {
  id: string;
  options: CheckboxListValue<T>[];
  name?: string
  value?: T[]
  onCheck?: (value: T[]) => void;
  disabled?: boolean;
  title?: string;
  error?: boolean;
  helperText?: string;
}
