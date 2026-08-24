import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { REGISTRATION_CHARGES_API_ENDPOINTS } from "./endpoints";
import { RegistrationChargesRecord, CreateRegistrationChargesPayload, UpdateRegistrationChargesPayload } from "./types";

export const registrationChargesKeys = {
  all: ["registration-charges"] as const,
  lists: () => [...registrationChargesKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...registrationChargesKeys.lists(), params] as const,
  details: () => [...registrationChargesKeys.all, "detail"] as const,
  detail: (id: string) => [...registrationChargesKeys.details(), id] as const,
};

export function useRegistrationChargesListQuery() {
  return useApiQuery<RegistrationChargesRecord[]>(
    registrationChargesKeys.lists(),
    REGISTRATION_CHARGES_API_ENDPOINTS.LIST
  );
}

export function useRegistrationChargesDetailQuery(id?: string) {
  return useApiQuery<RegistrationChargesRecord>(
    registrationChargesKeys.detail(id!),
    REGISTRATION_CHARGES_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRegistrationChargesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RegistrationChargesRecord, Error, CreateRegistrationChargesPayload>(
    REGISTRATION_CHARGES_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Registration Charges created successfully!");
          void queryClient.invalidateQueries({ queryKey: registrationChargesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateRegistrationChargesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RegistrationChargesRecord, Error, UpdateRegistrationChargesPayload>(
    (variables) => REGISTRATION_CHARGES_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Registration Charges updated successfully!");
          void queryClient.invalidateQueries({ queryKey: registrationChargesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteRegistrationChargesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => REGISTRATION_CHARGES_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Registration Charges deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: registrationChargesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
