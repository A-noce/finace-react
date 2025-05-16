
import CustomRadioGroup, { CustomRadioGroupProps } from "@components/input/CustomRadioGroup";
import { ComponentDefaultProps } from "@typing/forms";
import { zodMessageParse } from "@utils/zodMessageParse";
import { FieldValues, useController } from "react-hook-form";

type FormRadioGroupProps<T extends string, E extends FieldValues> = ComponentDefaultProps<
  CustomRadioGroupProps<T>,
  E
>;

const FormRadioGroup = <T extends string, E extends FieldValues>({
  name,
  control,
  ...props
}: FormRadioGroupProps<T,E>) => {
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
    <CustomRadioGroup
      {...props}
      value={field.value as any}
      onChange={onChange}
      name={field.name}
      error={!!error}
      helperText={error ? zodMessageParse(error) : ""}
    />
  );
};

export default FormRadioGroup;
