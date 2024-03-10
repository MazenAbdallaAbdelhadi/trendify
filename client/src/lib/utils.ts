import { AxiosError, AxiosResponse } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiResponse } from "./types/response";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractError<T>(err: Error) {
  const e = (err as AxiosError)?.response?.data as ApiResponse<T>;
  let msg = "NETWORK ERROR";
  let data = null;

  if (e) {
    msg = e.message;
    data = e.data;
  }

  return { msg, data };
}

export function extractResponse<T>(res: AxiosResponse) {
  const d = res.data as ApiResponse<T>;

  let msg = "NO MESSAGE";
  let data = null;

  if (d) {
    msg = d?.message;
    data = d?.data;
  }

  return { msg, data };
}
