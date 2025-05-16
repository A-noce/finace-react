import { NullUndefined } from "@typing/generic"
import { format, isValid, parseISO } from "date-fns"

export const stringToDate = (value: string) => {
    if(!value) return null
    if(!value.includes(':')) return parseISO(value)
    return new Date(value)
  }
  
  export const formatDate = (  date: NullUndefined<number | string | Date>, pattern = 'dd/MM/yyyy') => {
    if(!date) return ''
    const isLocalDate = typeof date === 'string' && !date.includes(':')
    const convertedDate = isLocalDate ? parseISO(date) : new Date(date)
    return format(convertedDate, pattern)
  }
  
  export const dateToLocalDate = (
    date: number | string | Date | undefined | null
  ) => {
    if (!date || !isValid(date)) return null
    return format(new Date(date), 'yyyy-MM-dd')
  }
  
  export const dateToLocalDateTime = (date: NullUndefined<Date | number>) => {
    if (!date || !isValid(date)) return null
    let newDate = date
    if (typeof date === 'number') {
      newDate = new Date(date)
    }
    return format(newDate, 'yyyy-MM-dd HH:mm:ss').replace(' ', 'T')
  }