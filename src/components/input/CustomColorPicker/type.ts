import { ColorPickerProps } from "antd";
import { Color } from "antd/es/color-picker";
import { ReactNode } from "react";

interface CommonColorPickerProps {
    id: string
    name?:string
    error?: boolean
    helperText?: ReactNode
}

interface ColorPickerPropsHex extends Omit<ColorPickerProps, 'onChange'>, CommonColorPickerProps {
    toHex: true
    onChange?: (color: string) => void
}

interface CustomColorPickerPropsColor  extends Omit<ColorPickerProps, 'onChange'>, CommonColorPickerProps {
    onChange?: (color: Color) => void
}

export type CustomColorPickerProps = ColorPickerPropsHex | CustomColorPickerPropsColor