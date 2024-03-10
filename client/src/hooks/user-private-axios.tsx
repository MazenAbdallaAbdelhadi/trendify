import { privateInstance } from "@/services/api/api";
import { useRefresh } from "@/services/api/auth";
import { useEffect } from "react";

const usePrivateAxios = () => {
  const token = "FAKE_TOKEN";
  const refresh = useRefresh();

  useEffect(() => {
    const requestInterceptor = privateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = privateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response, config } = error;
        const originalRequest = config;

        // if status is 401 and the request is first time then send refresh token
        if (response?.status === 401 && !response?._sent) {
          // set _sent flag to true to prevent repeating the request infinitely
          response._sent = true;

          // await refresh request
          await refresh();

          // retry the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return privateInstance(originalRequest);
        }

        return Promise.reject(error);
      }
    );

    // eject the interceptors
    return () => {
      privateInstance.interceptors.request.eject(requestInterceptor);
      privateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refresh]);

  return privateInstance;
};

export default usePrivateAxios;
