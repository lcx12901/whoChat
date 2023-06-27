import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosCancel } from './cancel'
import { AxiosRetry } from './retry'
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum'
import { useUserStore } from '@/store/modules/user'

interface axiosConfig {
  successMessage?: boolean
  errorMessage?: boolean
  cancelSame?: boolean
  retryCount?: number
  isRetry?: boolean
  loading?: boolean
  timestamp?: boolean
}

const defaultConfig: axiosConfig = {
  successMessage: false,
  errorMessage: true,
  cancelSame: false,
  isRetry: false,
  retryCount: 3,
  loading: true,
  timestamp: false,
}

const axiosCancel = new AxiosCancel()

// const axiosLoading = new AxiosLoading()

const service: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 10 * 1000, // 请求超时时间
  headers: { 'Content-Type': ContentTypeEnum.JSON },
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
service.interceptors.request.use((config: AxiosRequestConfig) => {
  const { getToken } = useUserStore()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { cancelSame } = config.requestOptions
  if (cancelSame)
    axiosCancel.addPending(config)

  if (getToken)
    config!.headers!.Authorization = unref(getToken) ?? ''

  // if (loading) {}
  // axiosLoading.addLoading()

  return config
})

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data
    axiosCancel.removePending(response.config)
    if (data.code === ResultEnum.SUCCESS) {
      // addAjaxLog(response)
      return data
    }
    else {
      // addAjaxErrorLog(response, data.message)
      return Promise.reject(data)
    }
  },
  (err) => {
    if (err.code === 'ERR_CANCELED')
      return
    const { isRetry, retryCount } = err.config.requestOptions
    if (isRetry && (err.config._retryCount || 0) < retryCount) {
      const axiosRetry = new AxiosRetry()
      axiosRetry.retry(service, err)
      return
    }
    axiosCancel.removePending(err.config || {})
    // setErrorMessage(err.response)
    return Promise.reject(err.response)
  },
)

const request = {
  async get<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return await request.request('GET', url, { params: data }, config)
  },
  async post<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return await request.request('POST', url, { data }, config)
  },
  async put<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return await request.request('PUT', url, { data }, config)
  },
  async delete<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return await request.request('DELETE', url, { params: data }, config)
  },
  request<T = any>(method = 'GET', url: string, data?: any, config?: axiosConfig): Promise<T> {
    const options = Object.assign({}, defaultConfig, config)
    return new Promise((resolve, reject) => {
      service({ method, url, ...data, requestOptions: options })
        .then((res) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          reject(e)
        })
        .finally(() => {
          // if (options.loading)
          // axiosLoading.closeLoading()
        })
    })
  },
}

export default request
