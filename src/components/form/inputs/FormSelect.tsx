import CustomSelect, {
  CustomSelectProps,
} from "@components/input/CustomSelect";
import { ComponentDefaultProps } from "@typing/forms";
import { zodMessageParse } from "@utils/zodMessageParse";
import { FieldValues, useController } from "react-hook-form";

export type FormFormSelectProps<E extends FieldValues> = ComponentDefaultProps<
  CustomSelectProps,
  E
>;

const FormSelect = <E extends FieldValues>({
  name,
  control,
  ...props
}: FormFormSelectProps<E>) => {
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
    <CustomSelect
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

export default FormSelect;
