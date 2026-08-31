import { useApiQuery } from "@/hooks/useTanstackApiHook";
import { SERVICES_API_ENDPOINTS } from "./endpoints";
import { ServiceItem } from "./types";
import { SERVICES_CONFIG } from "./constants";

export const servicesKeys = {
  all: ["merchant-services"] as const,
  lists: () => [...servicesKeys.all, "list"] as const,
};

export function useServicesListQuery() {
  const query = useApiQuery<ServiceItem[]>(
    servicesKeys.lists(),
    SERVICES_API_ENDPOINTS.LIST
  );

  // Return API data if available, fallback to SERVICES_CONFIG constant
  const data = (query.data && query.data.length > 0) ? query.data : SERVICES_CONFIG;

  return {
    ...query,
    data,
  };
}
