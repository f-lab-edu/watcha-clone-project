import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  status: number;
  message: string;
  result: T;
}

export interface ApiClientConfig {
  baseURL: string;
  accessToken: string;
}

interface CustomInstance extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete' | 'patch'> {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

const removeEmptyParams = (params: Record<string, unknown>) => {
  const result = { ...params };
  Object.keys(result).forEach((key) => {
    if (result[key] === null || result[key] === undefined || result[key] === '') {
      delete result[key];
    }
  });
  return result;
};

const apiConfig: ApiClientConfig = {
  baseURL: '',
  accessToken: '',
};

export const configureApiClient = (config: ApiClientConfig) => {
  apiConfig.baseURL = config.baseURL;
  apiConfig.accessToken = config.accessToken;
};

export const client = axios.create({
  timeout: 10000,
  headers: { accept: 'application/json' },
  params: { language: 'ko-kr' },
}) as CustomInstance;

client.interceptors.request.use((config) => {
  config.baseURL = apiConfig.baseURL;
  config.headers.Authorization = `Bearer ${apiConfig.accessToken}`;
  config.params = removeEmptyParams(config.params);
  return config;
});

client.interceptors.response.use(
  (resp) => resp,
  (error) => Promise.reject(error),
);
