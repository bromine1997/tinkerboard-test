import Axios from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    // 실패시 재시도 횟수
    retries?: number;
  }
}

export function createInstance() {
  const axiosInstance = Axios.create({ timeout: 2000 });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      const { config, response } = error;

      // 네트워크 오류일때만 재시도
      if (!response && config.retries > 0) {
        config.retries--;
        return axiosInstance.request(config);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

const api = createInstance();

export default api;
