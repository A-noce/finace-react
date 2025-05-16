import { ComponentDefaultProps } from "@typing/forms";
import { zodMessageParse } from "@utils/zodMessageParse";
import { FieldValues, useController } from "react-hook-form";
import { CustomIconButton, CustomTextField } from "@components/input";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { CustomTextFieldProps } from "@components/input/CustomTextField";

type PasswordFieldProps = CustomTextFieldProps;

const PasswordField = ({ value, ...rest }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const icon = showPassword ? HiOutlineEyeOff : HiOutlineEye;
  const endAdornment = (
    <CustomIconButton
      id="show-password"
      icon={icon}
      onClick={() => setShowPassword((state) => !state)}
    />
  );

  return (
    <CustomTextField
    {...rest}
      value={value}
      slotProps={{
        input: {
          startAdornment: <MdLockOutline />,
          endAdornment,
        },
      }}
      type={showPassword ? 'text' : 'password'}
      id="password-field"
    />
  );
};

export type FormTextFieldProps<E extends FieldValues> = ComponentDefaultProps<
  CustomTextFieldProps,
  E
>;

const FormPasswordField = <E extends FieldValues>({
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
    <PasswordField
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

export default FormPasswordField;
