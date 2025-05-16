import { Chip, ChipProps } from "@mui/material";

interface CustomChipProps extends Omit<ChipProps, 'color'> {
    color?: string
}

const CustomChip = ({color, ...props}: CustomChipProps) => {

    const background = color && /#/.test(color) ? color : '#' + color
    return <Chip {...props} variant="filled" sx={{background}} />
}

export default CustomChip