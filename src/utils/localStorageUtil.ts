export interface ItemData {
  token: null | undefined | string
  isDark: boolean
}

export type SetItem = <T extends keyof ItemData>(
  item: T,
  value: ItemData[T]
) => void

export type GetItem = <T extends keyof ItemData>(item: T) => ItemData[T] | null

export type ClearItem = <T extends keyof ItemData>(item: T) => void

export const setItem: SetItem = (item, value): void => {
  localStorage.setItem(item, JSON.stringify(value))
}

export const getItem: GetItem = (item) => {
  const value = localStorage.getItem(item)
  try {
    return value ? JSON.parse(value) : null
  } catch (e) {
    clearAll()
    return null
  }
}

export const clearItem: ClearItem = (item) => {
  localStorage.removeItem(item)
}

export const clearAll = (): void => {
  localStorage.clear()
}
