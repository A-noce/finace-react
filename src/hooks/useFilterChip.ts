import { FilterChipProps } from "@typing/generic";
import { useCallback, useState } from "react";

interface UseFilterChpProps<T extends Record<string, any>> {
  initialValue?: T;
  recordFieldUtils: Record<
    string,
    { label: string; formater?: (value: T[keyof T]) => string }
  >;
}

export const useFilterChip = <T extends Record<string, any>>({
  initialValue,
  recordFieldUtils,
}: UseFilterChpProps<T>) => {
  const [filterChip, setFilterChip] = useState<FilterChipProps<T>[]>(
    !!initialValue ? Object.entries(initialValue).map(([k, v]) => generateChip(k as keyof T,v)) : []
  );

  const generateChip = useCallback(
    (key: keyof T, value: T[keyof T]) => {
      const data = recordFieldUtils[key.toString()];
      return {
        key,
        label:  data ? `${data.label}: ${data?.formater?.(value) ?? value}` : ''
      };
    },
    [recordFieldUtils]
  );

  const onChangeFilter = (newFilter :T) => {
    setFilterChip(() => Object.entries(newFilter).map(([k, v]) => generateChip(k as keyof T,v)))
  }

  return {
    filterChip: filterChip.filter(({label}) => !!label),
    onChangeFilter
  }
};
