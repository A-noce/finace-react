import {
  Control,
  DefaultValues,
  Path,
  useForm,
  UseFormSetValue,
  UseFormReset,
  FieldValues,
  UseFormProps,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "@utils/zodMessageParse";
import { PartialNullable, PartialNullableUndefined } from "@typing/generic";

interface FormProps<T extends FieldValues>
  extends Omit<UseFormProps<T>, "resolver" | "defaultValues"> {
  validation: z.ZodType;
  defaultValues: PartialNullable<T>;
}

export type ComponentDefaultProps<T, E extends FieldValues> = T & {
  name: Path<E>;
  control: Control<E>;
};

export interface FormElementReturn<T extends FieldValues> extends Omit<UseFormReturn<T>, 'setValue' | 'reset'>{
  setValue: UseFormSetValue<PartialNullableUndefined<T>>;
  reset: UseFormReset<PartialNullableUndefined<T>>;
}

const useFormElement = <T extends FieldValues>({
  defaultValues: values,
  validation,
  ...props
}: FormProps<T>): FormElementReturn<T> => {
  const defaultValues = values as DefaultValues<T>;
  const methods = useForm<T>({
    resolver: zodResolver(validation),
    defaultValues,
    ...props,
  });
  const {
    reset: formReset,
    setValue: formSetValue,
    getValues,
    ...rest
  } = methods;

  const setValue: UseFormSetValue<PartialNullableUndefined<T>> = (
    name,
    value,
    options
  ) => {
    if (value && typeof value === "object") {
      value = Object.assign(getValues(name as Path<T>), value);
    }
    formSetValue(name as Path<T>, value as PathValue<T, Path<T>>, options);
  };

  const reset: UseFormReset<PartialNullableUndefined<T>> = (
    values,
    keepStateOptions
  ) => {
    if (values && typeof values === "object") {
      values = Object.assign(getValues(), values);
    }
    formReset(
      values as DefaultValues<T> | T | ((formValues: T) => T),
      keepStateOptions
    );
  };

  return {
    ...rest,
    setValue,
    getValues,
    reset,
  } as FormElementReturn<T>;
};

export default useFormElement;
