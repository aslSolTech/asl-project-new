"use client";

import { QueryClient, QueryClientProvider, environmentManager } from "@tanstack/react-query";
import { ReactNode } from "react";
import { bindGlobalConsole } from "@/lib/logger";

if (typeof window !== "undefined") {
  bindGlobalConsole();
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    // Server: always make a new query client for each request
    return makeQueryClient();
  } else {
    // Browser: reuse query client instance
    browserQueryClient ??= makeQueryClient();
    return browserQueryClient;
  }
}

interface QueryProviderProps {
  readonly children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
