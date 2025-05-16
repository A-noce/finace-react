import { FormControlLabelProps, FormControlProps, SwitchProps } from "@mui/material"

export interface CustomSwitchProps extends Omit<SwitchProps, 'id' | 'onChange'> {
    id: string
    selectedLabel: string
    notSelectedLabel?: string
    title?: string
    onChange?: (value: boolean) => void
    formControlLabel?: Omit<FormControlLabelProps, 'label' | 'control'>
    formControl?: FormControlProps
  }
