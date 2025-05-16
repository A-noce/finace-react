import { CancelToken, create } from 'apisauce'
import {  AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { systemConfig } from "@utils/systemConfig";

const cancelTokenSource = CancelToken.source

let requestOnFulfilled:
  | ((req: InternalAxiosRequestConfig) => InternalAxiosRequestConfig)
  | undefined = undefined

let responseOnFulfilled: ((req: AxiosResponse) => AxiosResponse) | undefined =
  undefined

const configInterceptorResponse = (
  onFulfilled: (req: AxiosResponse) => AxiosResponse
) => {
  responseOnFulfilled = onFulfilled
}

const configInterceptorRequest = (
  onFulfilled: (req: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
) => {
  requestOnFulfilled = onFulfilled
}

const apiSauceInstance = (url?: string) => {
  const instance = create({
    baseURL: url ?? systemConfig.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  instance.axiosInstance.interceptors.request.use((req) => {
    if (requestOnFulfilled) {
      return requestOnFulfilled(req)
    }
    return req
  })

  instance.axiosInstance.interceptors.response.use((res) => {
    if (responseOnFulfilled) {
      return responseOnFulfilled(res)
    }
    return res
  })

  return instance
}

export {
  apiSauceInstance,
  cancelTokenSource,
  configInterceptorResponse,
  configInterceptorRequest
}
