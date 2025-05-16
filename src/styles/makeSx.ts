import { Theme } from '@mui/material'
import { SystemStyleObject } from '@mui/system/styleFunctionSx'

type makeSxObject<T extends string> = Record<
  T,
  SystemStyleObject<Theme> | ((p: any) => SystemStyleObject<Theme>)
>

type makeSxFuncWithProps<T extends string, P> = (
  theme: Theme,
  props: P
) => makeSxObject<T>

type makeSxFuncKey<T extends string, P> = keyof ReturnType<
  makeSxFuncWithProps<T, P>
>

type makeSxReturn<T extends string, P> = (
  props?: P
) => (
  key: makeSxFuncKey<T, P>,
  ownerProps?: unknown
) => (theme: Theme) => SystemStyleObject<Theme>

export const makeSx =
  <T extends string, P>(sx: makeSxFuncWithProps<T, P>): makeSxReturn<T, P> =>
  (props = {} as P) =>
  (key, ownerProps) =>
  (theme) =>
    typeof sx(theme, props)[key] === 'function'
      ? (sx(theme, props)[key] as any)(ownerProps)
      : sx(theme, props)[key]
