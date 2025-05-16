import { createTheme } from '@mui/material'
import { themeColors } from '@styles/themeColors'
import { useMemo } from 'react'

export const useCustomTheme = (isDark: boolean) => {
  const colors = themeColors(isDark)
  return useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: 'Asap, sans-serif',
          button: {
            textTransform: 'none'
          }
        },
        palette: {
          mode: isDark ? 'dark' : 'light',
          primary: {
            main: colors.primary
          },
          secondary: {
            main: colors.secondary
          },
          warning: {
            main: colors.warning
          },
          error: {
            main: colors.error
          },
          background: {
            default: colors.background,
            paper: colors.paper
          },
        }
      }),
    [isDark]
  )
}
