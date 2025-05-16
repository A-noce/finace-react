
import CustomTextField, { CustomTextFieldProps } from "@components/input/CustomTextField";
import { ComponentDefaultProps } from "@typing/forms";
import { zodMessageParse } from "@utils/zodMessageParse";
import { FieldValues, useController } from "react-hook-form";

export type FormTextFieldProps<E extends FieldValues> = ComponentDefaultProps<
  CustomTextFieldProps,
  E
>;

const FormTextField = <E extends FieldValues>({
  name,
  control,
  ...props
}: FormTextFieldProps<E>) => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const error = fieldState.error;

  const onChange = (option: string) => {
    field.onChange(option);
    props?.onChange?.(option);
  };

  return (
    <CustomTextField
      {...props}
      name={field.name}
      inputRef={field.ref}
      onChange={onChange}
      onBlur={field.onBlur}
      value={props.value || (field.value as any)}
      error={!!error}
      helperText={error ? zodMessageParse(error) : props.helperText}
    />
  );
};

export default FormTextField;
