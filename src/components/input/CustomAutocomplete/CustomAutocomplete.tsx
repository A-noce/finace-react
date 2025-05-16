import React from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  CircularProgress,
  TextField,
} from "@mui/material";
import { CustomAutocompleteProps } from "./types";

export const CustomAutocomplete = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = false
>({
  id,
  value,
  onChangeValue,
  renderInput,
  label,
  TextFieldProps,
  selectKey,
  error,
  helperText,
  ...props
}: CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const renderOption = selectKey
    ? (propsLi: React.HTMLAttributes<HTMLLIElement>, option: T) => {
        return (
          <li {...propsLi} key={selectKey(option)}>
            {props.getOptionLabel ? props.getOptionLabel(option) : ""}
          </li>
        );
      }
    : undefined;

  const defaultInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      error={error}
      helperText={helperText}
      size={"small"}
      label={label || "Selecione"}
      variant="outlined"
      inputProps={{
        ...params.inputProps,
        autoComplete: "off",
      }}
      {...TextFieldProps}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {props.loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
          paddingRight: "39px",
        },
      }}
    />
  );
  return (
    <Autocomplete
      id={id}
      size={"small"}
      autoHighlight
      fullWidth
      noOptionsText={"Sem opção"}
      loadingText={"Carregando..."}
      renderInput={renderInput || defaultInput}
      renderOption={renderOption}
      {...props}
      onChange={(_, value) => onChangeValue?.(value as any)}
      value={(value as any) || null}
    />
  );
};
