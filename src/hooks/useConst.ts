import { Undefined } from "@typing/generic";
import { useRef } from "react";

export type UseConstReturn<T> = [() => Undefined<T>, (value?: T) => void]

export const useConst = <T>(defauktValue?: T): UseConstReturn<T> => {
  const ref = useRef(defauktValue);

  const setValue = (newValue?: T) => {
    ref.current = newValue;
  };

  return [() => ref.current, setValue];
};
