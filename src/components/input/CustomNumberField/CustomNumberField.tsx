import { InputAdornment, TextField, Typography, debounce } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CustomNumberFieldProps, NumberState } from "./type";

const initialState: NumberState = { numberValue: null, displayNumber: "" };

export const CustomNumberField = ({
  id,
  value,
  onChange,
  allowNull = false,
  format = false,
  initialValue,
  readOnly,
  required = false,
  label,
  onBlur,
  name,
  currency,
  ...props
}: CustomNumberFieldProps) => {
  const [numberState, setNumberState] = useState<NumberState>(initialState);
  const debounceNumber = useCallback(
    debounce(
      (
        d: number | null,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => onChange?.(d, e),
      25
    ),
    [onChange]
  );

  const { integer, decimal, size, maxLength, maxValue } = useMemo(() => {
    let integer = 1;
    let decimal = 0;
    let maxLength = 15;
    let maxValue = undefined;
    if (props?.mask) {
      const decimalMask = props.mask.split(",");
      integer = decimalMask[0].length;
      decimal = decimalMask[1] ? decimalMask[1].length : 0;
      maxLength = integer + decimal;
    }
    if (currency) {
      integer = 1;
      decimal = 2;
    }
    if (props?.maxLength) {
      maxLength = props.maxLength;
    }
    if (props?.maxValue) {
      maxValue = props.maxValue;
    }
    return {
      integer,
      decimal,
      size: integer + decimal,
      maxLength,
      maxValue,
    };
  }, [props.mask, currency, props.maxLength, props.maxLength]);

  const formatter = useCallback(
    (value: number) => {
      const semFormatacao = !format && !decimal;
      if (semFormatacao) return value.toString();
      return Intl.NumberFormat("pt-BR", {
        minimumIntegerDigits: integer,
        minimumFractionDigits: decimal,
      }).format(value);
    },
    [format, decimal, integer]
  );

  const maxFormatter = (value: number) => {
    return maxValue && value > maxValue ? maxValue : value;
  };

  const truncatFormatter = (value: number) => {
    const strigValue = value.toString();
    const slicedValue =
      strigValue.length >= maxLength ? strigValue.slice(0, maxLength) : value;
    return Number(slicedValue);
  };

  const decimalFormatter = (value: number) => {
    return value / Math.pow(10, decimal);
  };

  const formatterResult = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const repeatCharacter = size - 1;
    const setarParaNulo: boolean[] = [];
    setarParaNulo.push(value === "");
    setarParaNulo.push(
      value === "0".repeat(repeatCharacter) && numberState.numberValue === 0
    );
    if (allowNull && setarParaNulo.some(Boolean)) {
      setNumberState(initialState);
      debounceNumber?.(null, event);
      return { display: "", value: null };
    }
    let numericResult = Number(value);
    if (maxLength) numericResult = truncatFormatter(numericResult);
    if (decimal > 0) numericResult = decimalFormatter(numericResult);
    if (maxValue) numericResult = maxFormatter(numericResult);
    const display = formatter(numericResult);
    setNumberState({
      numberValue: numericResult,
      displayNumber: display,
    });
    debounceNumber?.(numericResult, event);
    return { display, value: numericResult };
  };

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const stringResult = event.target.value;
    const { display } = formatterResult(
      stringResult.replace(/\D+/g, ""),
      event
    );
    event.persist();
    const caretStart = event.target.selectionStart || 0;

    const f = display.length - stringResult.length;
    event.target.value = display;
    event.target.setSelectionRange(caretStart + f, caretStart + f);
  };

  useEffect(() => {
    if (initialValue === undefined) {
      setNumberState({
        numberValue: 0,
        displayNumber: formatter(0),
      });
      return;
    }
    const numberValue = allowNull ? Number(initialValue) : initialValue;
    if (numberValue !== numberState.numberValue) {
      if (numberValue === null || numberValue === undefined) {
        setNumberState(initialState);
      } else {
        setNumberState({
          numberValue,
          displayNumber: formatter(numberValue),
        });
      }
    }
  }, [initialValue, formatter]);

  const startAdornment = useMemo(() => {
    if (props.startIcon) return props.startIcon;
    if (currency) {
      return (
        <InputAdornment position="start">
          <Typography>R$</Typography>
        </InputAdornment>
      );
    }
    return undefined;
  }, [props.startIcon, currency]);

  const endAdornment = useMemo(() => {
    if (props.endIcon) return props.endIcon;
    if (props.percentage) {
      return (
        <InputAdornment position="end">
          <Typography>%</Typography>
        </InputAdornment>
      );
    }
    return undefined;
  }, [props.endIcon, props.percentage]);

  const displayValue = (() => {
    if (value !== undefined) {
      if (value === null) {
        return allowNull ? "" : formatter(0);
      }
      return formatter(value);
    }
    return numberState.displayNumber;
  })();

  return (
    <TextField
      {...props}
      id={id}
      name={name}
      size={"small"}
      variant={"outlined"}
      value={displayValue}
      onChange={onChangeInput}
      slotProps={{
        input: {
          readOnly: readOnly,
          style: readOnly ? { cursor: "default" } : undefined,
          autoComplete: "off",
          startAdornment,
          endAdornment,
        },
      }}
      label={required ? label + "*" : label}
    />
  );
};
