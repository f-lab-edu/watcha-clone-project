import axios from "axios";

// 공통 응답 구조
export interface ApiResponse<T> {
  status: number;
  message: string;
  result: T;
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
  }
});

client.interceptors.request.use(
  config => {
    const removedParams = { ...removeEmptyParams(config.params) }
    return { ...config, params: removedParams }
  }
)