import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios/axios-client";
import { AxiosRequestConfig } from "axios";

export interface ApiQueryConfig<TData, TError> {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, "queryKey" | "queryFn">;
}

/**
 * Use query wrapper for GET requests.
 * 
 * @param queryKey Unique cache key for TanStack query
 * @param url The endpoint path (e.g. '/companies')
 * @param config Optional axios config (params, headers) and react-query options
 */
export function useApiQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  url: string,
  config?: ApiQueryConfig<TData, TError>
) {
 
  return useQuery<TData, TError, TData, QueryKey>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosClient.get<TData>(url, {
        params: config?.params,
        headers: config?.headers,
      });
      return data;
    },
    ...config?.options,
  });
}

export type HttpMethod = "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiMutationConfig<TData, TError, TVariables> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  options?: UseMutationOptions<TData, TError, TVariables>;
}

/**
 * Generic useMutation wrapper for POST/PUT/DELETE/PATCH requests.
 * 
 * @param url The endpoint path or a function returning the path dynamically based on variables (e.g. (id) => `/companies/${id}`)
 * @param config Optional method ('POST' by default), custom headers, and react-query mutation options
 */
export function useApiMutation<TData = unknown, TError = Error, TVariables = unknown>(
  url: string | ((variables: TVariables) => string),
  config?: ApiMutationConfig<TData, TError, TVariables>
) {
  const method = config?.method ?? "POST";

  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const targetUrl = typeof url === "function" ? url(variables) : url;
      
      const axiosConfig: AxiosRequestConfig = {
        url: targetUrl,
        method,
        headers: config?.headers,
      };

      if (method !== "DELETE") {
        axiosConfig.data = variables;
      }

      const { data } = await axiosClient.request<TData>(axiosConfig);
      return data;
    },
    ...config?.options,
  });
}
