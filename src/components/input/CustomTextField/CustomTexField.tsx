import { TextField, debounce } from '@mui/material';
import { MaskEnum } from '@typing/enums';
import { mask } from '@utils/stringUtils';
import { ChangeEvent, useCallback, useState } from 'react';
import { CustomTextFieldProps } from './types';


export const CustomTextField = ({
  onChange,
  patterns,
  limitCharacteres,
  justNumber = false,
  showLimitChars = false,
  ...props
}: CustomTextFieldProps) => {
  const [text, setText] = useState('');
  const debounceText = useCallback(
    debounce(
      (
        d: string,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => onChange?.(d, e),
      25,
    ),
    [onChange],
  );

  const handleMask = (unMaskedText: string) => {
    if (!patterns) return unMaskedText;
    const replacedText = unMaskedText.replace(/[^a-zA-Z0-9]/g, '');
    if (!Array.isArray(patterns)) {
      return mask(replacedText.slice(0, patterns.length), patterns);
    }
    for (const p of patterns.sort((a, b) => a.length - b.length)) {
      const patternLength = p.replace(/[^#]/g, '').length;
      if (patternLength >= replacedText.length) {
        return mask(replacedText, p);
      }
    }
    const maxPattern = patterns.reduce((pattern, p) => {
      if (p.length > pattern.length) {
        return p;
      }
      return pattern;
    }, '' as MaskEnum);
    return mask(replacedText.slice(0, maxPattern.length), maxPattern);
  };

  const handleLimit = (text: string) => {
    if (!limitCharacteres) return text;
    return text?.length ? text.slice(0, limitCharacteres) : '';
  };

  const handleChangeText = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let value = event.target.value;

    if (justNumber || !!patterns) {
      const regExp = /\D/g;

      value = event.target.value.replace(regExp, '');
    }

    debounceText?.(handleLimit(value), event);
    setText(handleLimit(value));
  };

  const value =
    typeof props.value === 'string' ? handleLimit(handleMask(props.value)) : text;

  const helperText =
    limitCharacteres && showLimitChars
      ? `${limitCharacteres - value.length}  caracter(es) restantes`
      : props.helperText;

  return (
    <TextField
      {...props}
      size="small"
      variant="outlined"
      value={value}
      onChange={handleChangeText}
      helperText={helperText}
    />
  );
};
