import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { apiInstance } from "./api";
import { useAppDispatch } from "../state/store";
import { setToken, setUser } from "../state/authSlice";
import { extractResponse } from "@/lib/utils";
import { loginSchema } from "@/lib/schema/auth";

export const useRegisterMutation = () => {
  const dispatch = useAppDispatch();

  const register = async (data: FormData) => {
    return await apiInstance.post("/v1/auth/register", data, {
      withCredentials: true,
    });
  };

  type ResponstData = {
    token: string;
  };

  return useMutation({
    mutationFn: register,
    mutationKey: ["profile"],
    onSuccess: (data) => {
      const { data: d, msg } = extractResponse<ResponstData>(data);
      console.log(" ---------- USE_REGISTER_MUTATION ---------- ");
      console.log("token: ", d?.token);
      console.log("msg: ", msg);

      dispatch(
        setToken({
          token: d?.token,
        })
      );
    },
  });
};

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();

  const login = async (data: z.infer<typeof loginSchema>) => {
    return await apiInstance.post("/v1/auth/login", data, {
      withCredentials: true,
    });
  };

  type ResponstData = {
    token: string;
  };

  return useMutation({
    mutationFn: login,
    mutationKey: ["profile"],
    onSuccess: (data) => {
      const { data: d, msg } = extractResponse<ResponstData>(data);
      console.log(" ---------- USE_LOGIN_MUTATION ---------- ");
      console.log("token: ", d?.token);
      console.log("msg: ", msg);

      dispatch(
        setToken({
          token: d?.token,
        })
      );
    },
  });
};

export const useRefresh = () => {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    try {
      const res = await apiInstance.get("/v1/auth/refresh", {
        withCredentials: true,
      });

      type ResponseData = {
        token: string;
      };

      const { data } = extractResponse<ResponseData>(res);

      dispatch(
        setToken({
          token: data?.token,
        })
      );
      return data?.token;
    } catch (err) {
      console.log(" ---------- USE_REFRESH ---------- ");
      console.log(err);
    }
  };

  return refresh;
};

export const useLogoutMutaion = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    return apiInstance.delete("/v1/auth/logout", {
      withCredentials: true,
    });
  };

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(setUser({ user: null }));
      dispatch(setToken({ token: null }));
    },
  });
};
