import FormGroupCheckbox from "@components/form/inputs/FormGroupCheckbox";
import FormTextField from "@components/form/inputs/FormTextField";
import {
  CheckboxListValue,
} from "@components/input/CustomGroupCheckbox";
import { TransactionPeriodEnum, WeekdaysEnum } from "@typing/enums";
import { FormTransaction, weekdayEnumToString } from "@typing/transaction.type";
import { useFormContext, useWatch } from "react-hook-form";

const PeriodValueField = () => {
  const { control } = useFormContext<FormTransaction>();
  const period = useWatch({ control, name: "periodicity" });
  const weekOptions: CheckboxListValue<WeekdaysEnum>[] = Object.values(
    WeekdaysEnum
  ).map((value) => ({
    value,
    label: weekdayEnumToString[value],
  }));

  if (TransactionPeriodEnum.WEEKLY === period) {
    return (
      <FormGroupCheckbox
        id="form-transaction-weekly-period"
        row
        control={control}
        name="periodValue"
        options={weekOptions}
      />
    );
  }
  return (
    <FormTextField
      id="form-transaction-monthly-filed"
      label="Day of the month*"
      control={control}
      name="periodValue"
      patterns="##"
      fullWidth
    />
  );
};

export default PeriodValueField;
