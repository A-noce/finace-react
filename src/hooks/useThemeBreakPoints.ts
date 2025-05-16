import { useMediaQuery } from '@mui/material'
import { Theme, Breakpoint, Breakpoints } from '@mui/material/styles'

type BreakOptionsAvailable = keyof Pick<Breakpoints, 'up' | 'down'>

type UseThemeBreakPointsProps = [BreakOptionsAvailable, Breakpoint | number]

export const useThemeBreakPoints = ([
  breakFunc,
  point
]: UseThemeBreakPointsProps) => {
  const isMatch = useMediaQuery((theme: Theme) => {
    const breakPointFunction: Record<
      BreakOptionsAvailable,
      Breakpoints[BreakOptionsAvailable]
    > = {
      up: theme.breakpoints.up,
      down: theme.breakpoints.down
    }

    return breakPointFunction[breakFunc](point)
  })

  return { isMatch }
}

export default useThemeBreakPoints
