import { privateInstance } from "@/services/api/api";
import { useRefresh } from "@/services/api/auth";
import { selectCurrentToken } from "@/services/state/authSlice";
import { useAppSelector } from "@/services/state/store";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePrivateAxios = () => {
  const token = useAppSelector(selectCurrentToken);
  const navigate = useNavigate();
  const location = useLocation();

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
        if (response?.status === 401 && !originalRequest?._sent) {
          // set _sent flag to true to prevent repeating the request infinitely
          originalRequest._sent = true;

          // await refresh request
          const accessToken = await refresh();

          // retry the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return privateInstance(originalRequest);
        } else if (response?.status === 401 && originalRequest?._sent) {
          navigate("/login", { state: { from: location }, replace: true });
        }

        return Promise.reject(error);
      }
    );

    // eject the interceptors
    return () => {
      privateInstance.interceptors.request.eject(requestInterceptor);
      privateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refresh, navigate, location]);

  return privateInstance;
};

export default usePrivateAxios;
