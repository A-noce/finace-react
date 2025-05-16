import CustomNumberField, {
  CustomNumberFieldProps,
} from "@components/input/CustomNumberField";
import { ComponentDefaultProps } from "@typing/forms";
import { Null } from "@typing/generic";
import { zodMessageParse } from "@utils/zodMessageParse";
import { FieldValues, useController } from "react-hook-form";

export type FormNumberFieldProps<E extends FieldValues> = ComponentDefaultProps<
  CustomNumberFieldProps,
  E
>;

const FormNumberField = <E extends FieldValues>({
  name,
  control,
  ...props
}: FormNumberFieldProps<E>) => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const error = fieldState.error;

  const onChange = (option: Null<number>) => {
    field.onChange(option);
    props?.onChange?.(option);
  };

  return (
    <CustomNumberField
      {...props}
      name={field.name}
      onChange={onChange}
      onBlur={field.onBlur}
      value={props.value || (field.value as any)}
      error={!!error}
      helperText={error ? zodMessageParse(error) : props.helperText}
    />
  );
};

export default FormNumberField;
