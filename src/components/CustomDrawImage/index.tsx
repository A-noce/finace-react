import { Box, BoxProps } from "@mui/material"

interface CustomDrawImageProps extends BoxProps{
    image: string
    alt: string
}

const CustomDrawImage = ({ image, alt, ...boxProps }: CustomDrawImageProps) => {
    const defaultSize =  '50px'
    return <Box width={defaultSize} height={defaultSize} {...boxProps}>
        <img src={image} alt={`customdraw-${alt}`} style={{ width: '100%', height: '100%'}}/>
    </Box>
}

export default CustomDrawImage