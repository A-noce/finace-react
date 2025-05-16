import CustomDatePicker, {
  CustomDatePickerProps,
} from "@components/input/CustomDatePicker";
import { ComponentDefaultProps } from "@typing/forms";
import { zodMessageParse } from "@utils/zodMessageParse";
import { FieldValues, useController } from "react-hook-form";

export type FormNumberFieldProps<E extends FieldValues> = ComponentDefaultProps<
  CustomDatePickerProps,
  E
>;

const FormDatePicker = <E extends FieldValues>({
  name,
  control,
  ...props
}: FormNumberFieldProps<E>) => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const error = fieldState.error;

  return (
    <CustomDatePicker
      {...props}
      name={field.name}
      inputRef={field.ref}
      onChange={field.onChange}
      value={props.value || (field.value as any)}
      error={!!error}
      helperText={error ? zodMessageParse(error) : props.helperText}
    />
  );
};

export default FormDatePicker;
