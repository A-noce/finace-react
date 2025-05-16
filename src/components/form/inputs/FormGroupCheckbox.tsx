
import CustomGroupCheckbox, { CustomGroupCheckboxProps } from "@components/input/CustomGroupCheckbox";
import { ComponentDefaultProps } from "@typing/forms";
import { zodMessageParse } from "@utils/zodMessageParse";
import { FieldValues, useController } from "react-hook-form";

export type FormGroupCheckboxProps<T,E extends FieldValues> = ComponentDefaultProps<
  CustomGroupCheckboxProps<T>,
  E
>;

const FormGroupCheckbox = <T,E extends FieldValues>({
  name,
  control,
  ...props
}: FormGroupCheckboxProps<T,E>) => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const error = fieldState.error;

  const onChange = (option: T[]) => {
    field.onChange(option);
    props?.onChange?.(option as any);
  };

  return (
    <CustomGroupCheckbox
      {...props}
      name={field.name}
      onCheck={onChange}
      onBlur={field.onBlur}
      value={props.value || (field.value as any)}
      error={!!error}
      helperText={error ? zodMessageParse(error) : props.helperText}
    />
  );
};

export default FormGroupCheckbox;
