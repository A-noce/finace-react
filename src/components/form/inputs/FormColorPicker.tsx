import CustomColorPicker, {
  CustomColorPickerProps,
} from "@components/input/CustomColorPicker";
import { ComponentDefaultProps } from "@typing/forms";
import { zodMessageParse } from "@utils/zodMessageParse";
import { Color } from "antd/es/color-picker";
import { FieldValues, useController } from "react-hook-form";

export type FormColorPickerProps<E extends FieldValues> = ComponentDefaultProps<
  CustomColorPickerProps,
  E
>;

const FormColorPicker = <E extends FieldValues>({
  name,
  control,
  ...props
}: FormColorPickerProps<E>) => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const error = fieldState.error;

  const onChange = (option: Color) => {
    field.onChange(option);
    'toHex' in props ? props?.onChange?.(option.toHex()) : props.onChange?.(option)
  };

  return (
    <CustomColorPicker
      {...props}
      name={field.name}
      onChange={onChange}
      value={props.value || (field.value as any)}
      error={!!error}
      helperText={error ? zodMessageParse(error) : props.helperText}
    />
  );
};

export default FormColorPicker;
