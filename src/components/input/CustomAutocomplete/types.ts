import { AutocompleteProps, AutocompleteRenderInputParams, TextFieldProps } from "@mui/material";
import { Null } from "@typing/generic";

export interface CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends Pick<TextFieldProps, 'error' | 'helperText'>, Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "onChange" | "renderInput"
  > {
  id: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  TextFieldProps?: TextFieldProps;
  onChangeValue?: (option: Null<T>) => void;
  label?: string;
  selectKey?: (option: T) => string | number;
}