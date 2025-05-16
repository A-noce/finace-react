import { useMemo } from 'react'

type Service<T> = () => T

export const useService = <T>(service: Service<T>) => {
  return useMemo(() => service(), [])
}

export default useService
