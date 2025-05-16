import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers/models";
import { Null } from "@typing/generic";
import { dateToLocalDate, dateToLocalDateTime } from "@utils/dateUtils";
import { parseISO } from "date-fns";
import { useState } from "react";
import { CustomDatePickerProps } from "./types";

export const CustomDatePicker = ({
  value,
  type = null,
  onChange,
  format = "dd/MM/yyyy",
  fullWidth = false,
  helperText: helperTextProp,
  error,
  ...props
}: CustomDatePickerProps) => {
  const [internalDate, setInternalDate] = useState<Null<Date>>(null);

  const handleFormatDate = (value: Null<Date> | string): Null<Date> => {
    if (!(typeof value === "string")) return value;
    switch (type) {
      case "localdatetime":
        return value ? new Date(value) : null;
      case "localDate":
        return value ? parseISO(value) : null;
    }
    return null;
  };

  const handleChangetDate = (
    value: Null<Date>,
    e: PickerChangeHandlerContext<DateValidationError>
  ) => {
    if (!type) {
      onChange?.(value as any, e);
      return;
    }
    let finalDate = "";
    switch (type) {
      case "localdatetime":
        finalDate = value ? dateToLocalDateTime(value) ?? "" : "";
        break;
      case "localDate":
        finalDate = value ? dateToLocalDate(value) ?? "" : "";
        break;
    }
    onChange?.(finalDate as any, e);
    setInternalDate(value);
  };

  const displayValue = value ? handleFormatDate(value as any) : internalDate;

  const helperText = error ? helperTextProp : ''

  return (
    <DatePicker
      {...props}
      format={format}
      value={displayValue}
      onChange={handleChangetDate}
      slotProps={{
        textField: { size: "small", fullWidth: fullWidth, variant: "outlined", helperText, error },
      }}
    />
  );
};