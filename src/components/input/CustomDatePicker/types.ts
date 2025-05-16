import { DatePickerProps, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";

interface CommomProps {
  id: string;
  fullWidth?: boolean;
  helperText?: string;
  error?: boolean
}

interface LocalDateInputProps<T = string>
  extends CommomProps,
    Omit<DatePickerProps, "id" | "value" | "onChange"> {
  type: "localDate";
  onChange?: (
    date: T,
    e?: PickerChangeHandlerContext<DateValidationError>
  ) => void;
  value?: T;
}

interface LocalDateTimeInputProps<T = string>
  extends CommomProps,
    Omit<DatePickerProps, "id" | "value" | "onChange"> {
  type: "localdatetime";
  onChange?: (
    date: T,
    e?: PickerChangeHandlerContext<DateValidationError>
  ) => void;
  value?: T;
}

export type CustomDatePickerProps =
  | (Omit<DatePickerProps, "id"> & CommomProps & { type?: null })
  | LocalDateInputProps<string>
  | LocalDateTimeInputProps<string>;