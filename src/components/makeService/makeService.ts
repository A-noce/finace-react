
import { ApiResponse, ApisauceInstance } from 'apisauce'
import { AxiosRequestConfig, Canceler } from 'axios'
import { apiSauceInstance, cancelTokenSource } from './api'
import { systemConfig } from '@utils/systemConfig'

export interface ReturnMethods<S> {
  cancel: Canceler
  response: Promise<ApiResponse<S, S>>
}

export interface Methods {
  get: <S>(url: string,params?: any, axiosConfig?: AxiosRequestConfig) => ReturnMethods<S>
  post: <S>(
    url: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => ReturnMethods<S>
  patch: <S>(
    url: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => ReturnMethods<S>
  put: <S>(
    url: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => ReturnMethods<S>
  del: <S>(url: string, axiosConfig?: AxiosRequestConfig) => ReturnMethods<S>
  setPath: (path: string) => void
  api: (url?: string) => ApisauceInstance
  setContext: (ctx: string) => void
  setDefaultContext: (ctx: string) => void
  setParam: (key: string, value: string | number) => void
}

export const makeService = <T>(path: string, func: (method: Methods) => T) => {
  const defaultPath = path
  let defaultContext = ''
  let context = ''
  const mapParam = new Map<string, string>()
  let tempPath = path

  const setPath = (path: string) => {
    tempPath = path
  }

  const resetContext = () => {
    context = defaultContext
    tempPath = defaultPath
    mapParam.clear()
  }
  const setContext = (cxt: string) => {
    context = cxt
  }
  const setDefaultContext = (cxt: string) => {
    defaultContext = context = cxt
  }

  const getUrl = (path: string): string => {
    let url = buildUrl(systemConfig.baseUrl, context, tempPath, path)
    mapParam.forEach((value, key) => {
      url = url.replace(key, value)
    })

    return url
  }

  const addParam = (key: string, value: string | number) => {
    mapParam.set(paramKey(key), String(value))
  }

  const paramKey = (key: string) => {
    return `{${key}}`
  }

  const buildUrl = (...paths: string[]) => {
    const ignoreWith = /http(s?)/
    paths.forEach((p, index) => {
      if (ignoreWith.test(p) || !p) return
      if (!p.startsWith('/') && !p.startsWith('?')) {
        paths[index] = '/' + p
      }
    })

    return paths.join('')
  }

  const api = apiSauceInstance()

  const get: Methods['get'] = <T>(path: string, params: any, axiosConfig: any) => {
    const source = cancelTokenSource()
    const response = api.get<T>('', params, {
      ...axiosConfig,
      cancelToken: source.token,
      baseURL: getUrl(path)
    })

    resetContext()

    return {
      response,
      cancel: source.cancel
    }
  }

  const post: Methods['post'] = <T>(
    path: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => {
    const source = cancelTokenSource()
    const response = api.post<T>('', data, {
      ...axiosConfig,
      cancelToken: source.token,
      baseURL: getUrl(path)
    })

    resetContext()

    return {
      response,
      cancel: source.cancel
    }
  }

  const put: Methods['put'] = <T>(
    path: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => {
    const source = cancelTokenSource()
    const response = api.put<T>('', data, {
      ...axiosConfig,
      cancelToken: source.token,
      baseURL: getUrl(path)
    })

    resetContext()

    return {
      response,
      cancel: source.cancel
    }
  }

  const del: Methods['del'] = <T>(
    path: string,
    _?: any,
    axiosConfig?: AxiosRequestConfig
  ) => {
    const source = cancelTokenSource()
    const response = api.delete<T>(
      '',
      {},
      {
        ...axiosConfig,
        cancelToken: source.token,
        baseURL: getUrl(path)
      }
    )

    resetContext()

    return {
      response,
      cancel: source.cancel
    }
  }

  const patch: Methods['patch'] = <T>(
    path: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => {
    const source = cancelTokenSource()
    const response = api.patch<T>('', data, {
      ...axiosConfig,
      cancelToken: source.token,
      baseURL: getUrl(path)
    })

    resetContext()

    return {
      response,
      cancel: source.cancel
    }
  }

  return () =>
    func({
      get,
      post,
      put,
      patch,
      setDefaultContext,
      setContext,
      del,
      setPath,
      api: apiSauceInstance,
      setParam: addParam
    })
}
