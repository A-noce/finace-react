import { CheckboxProps, FormControlLabelProps, TypographyProps } from "@mui/material";

export interface CustomCheckBoxProps
  extends Omit<CheckboxProps, "onChange" | "value"> {
  id: string;
  label?: React.ReactNode;
  initialValue?: boolean;
  variantFont?: TypographyProps["variant"];
  onChange?: (value: boolean) => void;
  formControlLabelProps?: Omit<FormControlLabelProps, "control" | "label">;
  error?: boolean
  helperText?: string
}