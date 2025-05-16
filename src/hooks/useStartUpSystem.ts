import { configInterceptorRequest } from "@components/makeService/api"
import { useLayoutEffect } from "react"

export const useStartupSystem = () => {
  const initApiSauce = () => {
    configInterceptorRequest((request) => {
      request.headers.provider = 'finances'
      return request
    })
  }

  useLayoutEffect(() => {
    console.log('Initialize api')
    initApiSauce()
  }, [])
}
