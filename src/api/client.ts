import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// 공통 응답 구조
export interface ApiResponse<T> {
  status: number;
  message: string;
  result: T;
}

interface CustomInstance extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete' | 'patch'> {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}


const removeEmptyParams = (params: any) => {
  const result = { ...params };
  Object.keys(result).forEach(key => {
    if (result[key] === null || result[key] === undefined || result[key] === '') {
      delete result[key];
    }
  });

  return result;
}

export const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`
  },
  params: { language: 'ko-kr' }
}) as CustomInstance;

client.interceptors.request.use(
  config => {
    const removedParams = { ...removeEmptyParams(config.params) }
    return { ...config, params: removedParams }
  }
)

client.interceptors.response.use(resp => resp, (error) => {
  return Promise.reject(error);
})