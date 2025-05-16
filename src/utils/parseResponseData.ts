import { ServerData } from '@typing/generic'
import { ApiResponse } from 'apisauce'

export const parseResponseData = <T>(
  response: ApiResponse<T>
): ServerData<T> => {

  const data: any = response.data

  if (response.ok) {
    return {
      success: response.ok,
      body: data.body,
      message: 'success',
      messageCode: 'SUCCESS',
      statusCode: 200
    }
  }
  switch (response.problem) {
    case 'CANCEL_ERROR': {
      break
    }
  }
  return {
    success: false,
    message: data.message || '',
    messageCode: response.problem as string,
    statusCode: response.status || 500,
    body: null
  }
}
