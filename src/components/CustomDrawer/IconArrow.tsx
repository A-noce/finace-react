import { Box } from '@mui/material'
import { FaCaretDown } from 'react-icons/fa'
import { useStyleIconArrow } from './styles'

interface IconArrowProps {
  isDown: boolean
  isDrawerOpen: boolean
}

export const IconArrow = ({ isDrawerOpen, isDown }: IconArrowProps) => {
  const classes = useStyleIconArrow({ isDrawerOpen, isDown })

  return (
    <Box sx={classes('arrow')}>
      <FaCaretDown />
    </Box>
  )
}
