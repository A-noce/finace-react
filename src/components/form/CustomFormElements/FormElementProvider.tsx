import { PropsWithChildren } from "react";
import { FieldValues, FormProvider } from "react-hook-form";
import { FormElementReturn } from "./useFormElement";

export interface FormElementProviderProps<T extends FieldValues> {
  formMethods: FormElementReturn<T>;
}

const FormElementProvider = <T extends FieldValues>({
  children,
  formMethods,
}: PropsWithChildren<FormElementProviderProps<T>>) => {
  return (
    <FormProvider
      {...formMethods}
      setValue={formMethods.setValue as any}
      reset={formMethods.reset as any}
    >
      {children}
    </FormProvider>
  );
};
export default FormElementProvider;
