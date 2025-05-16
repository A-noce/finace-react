import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch, Typography } from "@mui/material"
import { useState } from "react"
import { CustomSwitchProps } from "./types"


export const CustomSwitch = ({notSelectedLabel, ...props}: CustomSwitchProps) => {
    const {id, value, onChange, selectedLabel, title, formControl, formControlLabel, ...switchProps} = props
    const [checked, setChecked] = useState<boolean>(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked
        setChecked(value)
        onChange?.(value)
      }
    
      if (!notSelectedLabel) notSelectedLabel = selectedLabel
    
      const displayChecked = value !== undefined ? !!value : checked

      return (
        <FormControl {...formControl}>
          {title && (
            <FormLabel focused={false}>
              <Typography variant={'subtitle2'}>{title}</Typography>
            </FormLabel>
          )}
          <FormGroup>
            <FormControlLabel
              {...formControlLabel}
              control={
                <Switch
                  {...switchProps}
                  id={`${id}-switch`}
                  size={'small'}
                  checked={displayChecked}
                  onChange={handleChange}
                  color={'primary'}
                />
              }
              label={
                <Typography variant={'subtitle2'}>
                  {displayChecked ? selectedLabel : notSelectedLabel}
                </Typography>
              }
            />
          </FormGroup>
        </FormControl>
      )
}