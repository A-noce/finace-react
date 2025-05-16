import { FieldValues, useController } from "react-hook-form";
import { ComponentDefaultProps } from "@typing/forms";
import { zodMessageParse } from "@utils/zodMessageParse";

import { Null } from "@typing/generic";
import CustomAutocomplete, { CustomAutocompleteProps } from "@components/input/CustomAutocomplete";

interface FormAutoCompleteProps<
  T,
  E extends FieldValues,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends ComponentDefaultProps<
    CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    E
  > {
    helperText?: string
  }

const FormAutoComplete = <
  T,
  E extends FieldValues,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = false
>({
  id,
  name,
  control,
  ...props
}: FormAutoCompleteProps<T, E, Multiple, DisableClearable, FreeSolo>) => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const error = fieldState.error

  const onChange = (option: Null<T>) => {
    field.onChange(option)
    props?.onChangeValue?.(option)
  }

  return (
    <CustomAutocomplete
      {...props}
      id={`formautocomplete-${name}`}
      onBlur={field.onBlur}
      onChangeValue={onChange}
      value={(field.value as any) ?? (props.multiple ? ([] as any) : null)}
      error={!!error}
      helperText={error ? zodMessageParse(error) : props.helperText}    />
  );
};

export default FormAutoComplete;
