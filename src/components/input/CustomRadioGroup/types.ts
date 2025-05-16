import { FormControlLabelProps, RadioGroupProps, RadioProps } from "@mui/material";
import { ReactNode } from "react";

export interface RadioLabelValueProps<T extends string> {
  label: string;
  value: T;
  radioProps?: Omit<RadioProps, "size" | "color">;
  formControlLabelProps?: Omit<FormControlLabelProps, "control" | "label">;
}

export interface CustomRadioGroupProps<T extends string>
  extends Omit<RadioGroupProps, "onChange" | "value"> {
  id: string;
  onChange?: (value: string) => void;
  value?: T;
  initialValue?: string;
  error?: boolean;
  helperText?: ReactNode
  radios: RadioLabelValueProps<T>[];
}