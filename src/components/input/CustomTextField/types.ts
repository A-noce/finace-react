import { TextFieldProps } from "@mui/material";
import { MaskEnum } from "@typing/enums";
import { ChangeEvent } from "react";

export interface CustomTextFieldProps
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  id: string;
  value?: string;
  limitCharacteres?: number;
  justNumber?: boolean;
  onChange?: (value: string, event?: ChangeEvent) => void;
  patterns?: (MaskEnum | string)[] | (MaskEnum | string);
  showLimitChars?: boolean;
  isPassword?: boolean
}