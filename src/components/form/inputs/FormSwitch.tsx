import { FieldValues, useController } from "react-hook-form";
import { FormControlProps } from "@mui/material";
import { ComponentDefaultProps } from "@typing/forms";
import CustomSwitch from "@components/input/CustomSwitch";

interface FormSwitchFieldProps {
  id: string;
  selectedLabel: string;
  notSelectedLabel: string;
  formControlProps?: FormControlProps;
  title: string;
  handleChange?: (value: boolean) => void;
}

type FormSwitchProps<E extends FieldValues> = ComponentDefaultProps<
  FormSwitchFieldProps,
  E
>;

const FormSwitch = <E extends FieldValues>({
  name,
  control,
  ...props
}: FormSwitchProps<E>) => {
  const { field } = useController({ control, name });

  const onChange = (option: boolean) => {
    field.onChange(option);
    props?.handleChange?.(option);
  };

  return (
    <CustomSwitch {...props} checked={field.value as any} onChange={onChange} />
  );
};

export default FormSwitch;
