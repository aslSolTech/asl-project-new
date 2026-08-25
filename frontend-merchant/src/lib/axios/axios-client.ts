import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { secureZustandStorage } from "@/lib/secureStorage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Auth Token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = secureZustandStorage.getItem("auth_token") || localStorage.getItem("auth_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const customMessage = error.response?.data?.message ?? error.message ?? "An unexpected error occurred.";
    if (error.response?.status === 401 && typeof window !== "undefined") {
      secureZustandStorage.removeItem("auth_token");
      localStorage.removeItem("auth_token");
    }
    return Promise.reject(new Error(customMessage));
  }
);
