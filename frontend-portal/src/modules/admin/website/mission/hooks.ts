import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { MISSION_API_ENDPOINTS } from "./endpoints";
import { MissionRecord, CreateMissionPayload, UpdateMissionPayload } from "./types";

export const missionKeys = {
  all: ["mission"] as const,
  lists: () => [...missionKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...missionKeys.lists(), params] as const,
  details: () => [...missionKeys.all, "detail"] as const,
  detail: (id: string) => [...missionKeys.details(), id] as const,
};

export function useMissionListQuery() {
  return useApiQuery<MissionRecord[]>(
    missionKeys.lists(),
    MISSION_API_ENDPOINTS.LIST
  );
}

export function useMissionDetailQuery(id?: string) {
  return useApiQuery<MissionRecord>(
    missionKeys.detail(id!),
    MISSION_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateMissionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<MissionRecord, Error, CreateMissionPayload>(
    MISSION_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Mission created successfully!");
          void queryClient.invalidateQueries({ queryKey: missionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateMissionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<MissionRecord, Error, UpdateMissionPayload>(
    (variables) => MISSION_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Mission updated successfully!");
          void queryClient.invalidateQueries({ queryKey: missionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteMissionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => MISSION_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Mission deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: missionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
