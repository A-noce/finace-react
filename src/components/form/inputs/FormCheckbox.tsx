import CustomCheckBox, { CustomCheckBoxProps } from "@components/input/CustomCheckbox";
  import { ComponentDefaultProps } from "@typing/forms";
  import { zodMessageParse } from "@utils/zodMessageParse";
  import { FieldValues, useController } from "react-hook-form";
  
  export type FormCheckboxProps<E extends FieldValues> = ComponentDefaultProps<
    CustomCheckBoxProps,
    E
  >;
  
  const FormCheckbox = <E extends FieldValues>({
    name,
    control,
    ...props
  }: FormCheckboxProps<E>) => {
    const { field, fieldState } = useController({
      control,
      name,
    });
  
    const error = fieldState.error;
  
    const onChange = (value: boolean) => {
      field.onChange(value);
      props?.onChange?.(value);
    };
  
    return (
      <CustomCheckBox
        {...props}
        name={field.name}
        inputRef={field.ref}
        onChange={onChange}
        onBlur={field.onBlur}
        checked={props.checked || (field.value as any)}
        error={!!error}
        helperText={error ? zodMessageParse(error) : props.helperText}
      />
    );
  };
  
  export default FormCheckbox;
  