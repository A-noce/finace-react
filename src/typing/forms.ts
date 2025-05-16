import { Control, FieldValues, Path } from "react-hook-form"

export type ComponentDefaultProps<T, E extends FieldValues> = T & {
    name: Path<E>
    control: Control<E>
  }