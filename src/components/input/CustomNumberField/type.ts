import { TextFieldProps } from "@mui/material";
import { Null } from "@typing/generic";
import { ReactNode } from "react";

export interface CustomNumberFieldProps
  extends Omit<TextFieldProps, "onChange"> {
  id: string;
  percentage?: boolean;
  format?: boolean;
  currency?: boolean;
  mask?: string;
  onChange?: (
    value: Null<number>,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  initialValue?: Null<number>;
  allowNull?: boolean;
  required?: boolean;
  maxValue?: number;
  maxLength?: number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  readOnly?: boolean;
  value?: Null<number>;
}

export interface NumberState {
  numberValue: Null<number>;
  displayNumber: string;
}
